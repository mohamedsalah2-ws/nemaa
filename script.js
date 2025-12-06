// بيانات المنتجات
const productsDB = [
    { id: 1, name: "سوبر نيتروجين", cat: "نمو خضري", catCode: "growth", img: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800", desc: "أقوى سماد للنمو الخضري السريع.", usage: "ري بالتنقيط" },
    { id: 2, name: "فوسفو روتس", cat: "جذور", catCode: "roots", img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800", desc: "جذور قوية وتزهير كثيف.", usage: "رش ورقي" },
    { id: 3, name: "بوتاسيوم كينج", cat: "إثمار", catCode: "fruit", img: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=800", desc: "تحجيم وجودة للثمار.", usage: "بعد العقد" },
    { id: 4, name: "ميكرو باور", cat: "عناصر", catCode: "elements", img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800", desc: "علاج نقص العناصر.", usage: "عند الاصفرار" }
];

// الخلفية التفاعلية
const initParticles = () => {
    const canvas = document.getElementById("canvas-bg");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, particles;
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
    window.addEventListener('mouseout', () => { mouse.x = null; mouse.y = null; });

    class Particle {
        constructor() { this.x = Math.random() * w; this.y = Math.random() * h; this.vx = (Math.random() - 0.5) * 0.5; this.vy = (Math.random() - 0.5) * 0.5; this.size = Math.random() * 2; this.color = `rgba(16, 185, 129, ${Math.random() * 0.5})`; }
        update() { 
            this.x += this.vx; this.y += this.vy; 
            if (this.x < 0 || this.x > w) this.vx *= -1; 
            if (this.y < 0 || this.y > h) this.vy *= -1; 
            if(mouse.x != null) {
                let dx = mouse.x - this.x; let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx*dx + dy*dy);
                if(distance < 150) { this.x -= dx/20; this.y -= dy/20; }
            }
        }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fillStyle = this.color; ctx.fill(); }
    }

    function init() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; particles = []; for(let i=0; i<particleCount; i++) particles.push(new Particle()); }
    function animate() { 
        ctx.clearRect(0, 0, w, h); 
        for(let i=0; i<particles.length; i++) { 
            particles[i].update(); particles[i].draw(); 
            for(let j=i; j<particles.length; j++) { 
                let dx = particles[i].x - particles[j].x; let dy = particles[i].y - particles[j].y; 
                let distance = Math.sqrt(dx*dx + dy*dy); 
                if(distance < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(16, 185, 129, ${0.1 * (1 - distance/100)})`; ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); } 
            } 
        } 
        requestAnimationFrame(animate); 
    }
    window.addEventListener('resize', () => setTimeout(init, 100)); init(); animate();
};

document.addEventListener("DOMContentLoaded", function() {
    
    // حقن النافبار والفوتر تلقائياً
    const navbarHTML = `
    <nav class="navbar desktop-only">
        <div class="nav-content">
            <a href="index.html" class="logo"><i class="fas fa-leaf"></i> نماء</a>
            <ul class="nav-links">
                <li><a href="index.html" data-page="index">الرئيسية</a></li>
                <li><a href="products.html" data-page="products">المتجر</a></li>
                <li><a href="contact.html" data-page="contact">اتصل بنا</a></li>
            </ul>
            <a href="products.html" class="btn-glow">تصفح المنتجات</a>
        </div>
    </nav>
    <div class="mobile-nav">
        <a href="index.html" class="m-item" data-page="index"><i class="fas fa-home"></i></a>
        <a href="products.html" class="m-item" data-page="products"><i class="fas fa-box"></i></a>
        <div class="m-center"><a href="tel:01000000000" style="color:black;"><i class="fas fa-phone"></i></a></div>
        <a href="https://wa.me/201000000000" class="m-item"><i class="fab fa-whatsapp"></i></a>
        <a href="contact.html" class="m-item" data-page="contact"><i class="fas fa-envelope"></i></a>
    </div>`;

    const footerHTML = `
    <footer class="main-footer">
        <div class="footer-line"></div>
        <div class="container">
            <div class="footer-cta-section">
                <div class="cta-content"><h2>جاهز لزيادة إنتاجك؟</h2><p>انضم لآلاف المزارعين الناجحين.</p></div>
                <a href="contact.html" class="btn-glow-white">تواصل مع خبير</a>
            </div>
            <div class="footer-grid">
                <div class="footer-col brand-col">
                    <a href="#" class="footer-logo" style="color:white; font-size:1.8rem; font-weight:800; display:flex; align-items:center; gap:10px; margin-bottom:15px;"><i class="fas fa-leaf" style="color:#10b981;"></i> نماء</a>
                    <p class="brand-text">حلول زراعية ذكية لمستقبل مستدام.</p>
                    <div class="social-row"><a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a><a href="#" class="social-icon"><i class="fab fa-whatsapp"></i></a></div>
                </div>
                <div class="footer-col">
                    <h3 class="col-title">روابط</h3>
                    <ul class="footer-links"><li><a href="index.html">الرئيسية</a></li><li><a href="products.html">المتجر</a></li><li><a href="contact.html">تواصل</a></li></ul>
                </div>
                <div class="footer-col">
                    <h3 class="col-title">اتصل</h3>
                    <ul class="contact-list"><li><i class="fas fa-phone-alt"></i> 01000000000</li><li><i class="fas fa-envelope"></i> info@namaa.com</li></ul>
                </div>
            </div>
            <div class="footer-bottom"><p>© 2025 نماء للأسمدة.</p></div>
        </div>
    </footer>`;

    document.body.insertAdjacentHTML("afterbegin", navbarHTML);
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    // تفعيل الرابط النشط
    const currentPage = window.location.pathname.split("/").pop().replace(".html", "") || "index";
    document.querySelectorAll(`a[data-page="${currentPage}"], .m-item[data-page="${currentPage}"]`).forEach(el => el.classList.add("active"));

    initParticles();

    // إخفاء Preloader
    const preloader = document.querySelector('.preloader');
    if(preloader) setTimeout(() => { preloader.style.opacity = '0'; setTimeout(() => preloader.style.visibility = 'hidden', 500); }, 1000);

    // Navbar Scroll
    const navbar = document.querySelector('.navbar');
    if(navbar) window.addEventListener('scroll', () => { window.scrollY > 30 ? navbar.classList.add('scrolled') : navbar.classList.remove('scrolled'); });

    // AOS
    if (typeof AOS !== 'undefined') AOS.init({ offset: 100, duration: 800, once: true });

    // Slider Logic (Home)
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
        productsDB.forEach(product => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = createProductCard(product);
            swiperWrapper.appendChild(slide);
        });
        if (typeof Swiper !== 'undefined') new Swiper(".mySwiper", { slidesPerView: 1, spaceBetween: 25, loop: true, autoplay: { delay: 3000 }, pagination: { clickable: true }, breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } } });
    }

    // Filter Logic (Store)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productGrid = document.querySelector('.products-grid');
    if (productGrid) {
        productsDB.forEach(product => {
            productGrid.innerHTML += createProductCard(product);
        });
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                document.querySelectorAll('.product-card').forEach(card => {
                    if(filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'flex'; card.classList.add('show');
                    } else {
                        card.style.display = 'none'; card.classList.remove('show');
                    }
                });
            });
        });
    }

    // Details Logic
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (document.getElementById('p-name') && productId) {
        const product = productsDB.find(p => p.id == productId);
        if (product) {
            document.getElementById('p-image').src = product.img;
            document.getElementById('p-name').innerText = product.name;
            document.getElementById('p-cat').innerText = product.cat;
            document.getElementById('tab-content').innerText = product.desc;
            
            const tabDesc = document.getElementById('tab-desc');
            const tabUsage = document.getElementById('tab-usage');
            const content = document.getElementById('tab-content');

            tabDesc.addEventListener('click', () => { tabDesc.classList.add('active'); tabUsage.classList.remove('active'); content.innerText = product.desc; });
            tabUsage.addEventListener('click', () => { tabUsage.classList.add('active'); tabDesc.classList.remove('active'); content.innerText = product.usage; });
        }
    }
});

function createProductCard(product) {
    return `
    <div class="product-card" data-category="${product.catCode}">
        <div class="p-img-box"><img src="${product.img}" class="p-img"></div>
        <div class="p-badge">${product.cat}</div>
        <div class="p-details">
            <h3 style="color:white; margin-bottom:10px;">${product.name}</h3>
            <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:15px;">${product.desc.substring(0, 50)}...</p>
            <button onclick="window.location.href='product-details.html?id=${product.id}'" class="p-btn">التفاصيل</button>
        </div>
    </div>`;
}
