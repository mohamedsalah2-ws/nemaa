// --- 1. قاعدة بيانات المنتجات ---
const productsDB = [
    {
        id: 1,
        name: "سوبر نيتروجين N46",
        category: "منشطات نمو",
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=800",
        description: "السماد الأقوى للنمو الخضري. يحتوي على نسبة نيتروجين 46% مع تقنية النانو.",
        usage: "يستخدم بمعدل 50 كجم للفدان في الرية الأولى.",
        specs: "نيتروجين: 46% | ذوبان: 100% | خالي من الشوائب"
    },
    {
        id: 2,
        name: "فوسفو روتس",
        category: "جذور وتزهير",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
        description: "مركب عالي الفسفور يدعم انتشار الجذور ويزيد من نسبة العقد.",
        usage: "يضاف مع ماء الري بمعدل 2 لتر للفدان.",
        specs: "فسفور: 50% | بوتاسيوم: 10% | أحماض أمينية"
    },
    {
        id: 3,
        name: "بوتاسيوم كينج",
        category: "تحجيم ثمار",
        image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=800",
        description: "مسؤول عن نقل السكريات للثمار وزيادة حجمها وصلابتها.",
        usage: "رش ورقي بمعدل 1.5 جرام/لتر بعد العقد.",
        specs: "بوتاسيوم: 40% | كبريت: 15% | سترات"
    },
    {
        id: 4,
        name: "ميكرو باور",
        category: "عناصر صغرى",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800",
        description: "مخلوط عناصر صغرى مخلبية لعلاج نقص العناصر.",
        usage: "رش ورقي عند ظهور أعراض الاصفرار.",
        specs: "حديد: 4% | زنك: 3% | منجنيز: 3%"
    }
];

// --- 2. كود الخلفية السحرية (Particle Network) ---
const initParticles = () => {
    const canvas = document.getElementById("canvas-bg");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const particleCount = window.innerWidth < 768 ? 50 : 100; // تقليل العدد في الموبايل
    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.size = Math.random() * 2;
            this.color = `rgba(16, 185, 129, ${Math.random() * 0.5})`; 
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
            
            // Mouse Interaction
            let dx = mouse.x - this.x; let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            if(distance < 200) {
                this.x -= dx/20; this.y -= dy/20;
            }
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
            ctx.fillStyle = this.color; ctx.fill();
        }
    }

    function init() {
        w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight;
        particles = [];
        for(let i=0; i<particleCount; i++) particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        for(let i=0; i<particles.length; i++) {
            particles[i].update(); particles[i].draw();
            for(let j=i; j<particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(16, 185, 129, ${1 - distance/150})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', init);
    init(); animate();
};

document.addEventListener('DOMContentLoaded', function() {
    
    // تشغيل الخلفية
    initParticles();

    // إخفاء شاشة التحميل
    const preloader = document.querySelector('.preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.visibility = 'hidden', 500);
        }, 1500);
    }

    // تفعيل المكتبات
    if (typeof AOS !== 'undefined') AOS.init({ offset: 100, duration: 800, once: true });

    // Sticky Nav
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled');
            else navbar.classList.remove('scrolled');
        });
    }

    // تعبئة المنتجات
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
        productsDB.forEach(product => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <div class="product-card">
                    <div class="p-img-box"><img src="${product.image}" class="p-img"></div>
                    <div class="p-badge">${product.category}</div>
                    <div class="p-details">
                        <h3 style="color:white; margin-bottom:10px;">${product.name}</h3>
                        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:15px;">${product.description.substring(0, 50)}...</p>
                        <button onclick="window.location.href='product-details.html?id=${product.id}'" class="p-btn">عرض التفاصيل</button>
                    </div>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });
        if (typeof Swiper !== 'undefined') {
            new Swiper(".mySwiper", {
                slidesPerView: 1, spaceBetween: 25, loop: true, autoplay: { delay: 3000 },
                pagination: { clickable: true }, breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
            });
        }
    }

    // صفحة التفاصيل
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (document.getElementById('p-name') && productId) {
        const product = productsDB.find(p => p.id == productId);
        if (product) {
            document.getElementById('p-image').src = product.image;
            document.getElementById('p-name').innerText = product.name;
            document.getElementById('p-cat').innerText = product.category;
            document.getElementById('tab-content').innerText = product.description;

            const tabDesc = document.getElementById('tab-desc');
            const tabUsage = document.getElementById('tab-usage');
            const contentArea = document.getElementById('tab-content');

            tabDesc.addEventListener('click', () => {
                tabDesc.classList.add('active'); tabUsage.classList.remove('active');
                contentArea.innerText = product.description + "\n\n" + product.specs;
            });

            tabUsage.addEventListener('click', () => {
                tabUsage.classList.add('active'); tabDesc.classList.remove('active');
                contentArea.innerText = product.usage;
            });
        }
    }
});
