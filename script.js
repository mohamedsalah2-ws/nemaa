// --- قاعدة بيانات المنتجات ---
const productsDB = [
    {
        id: 1,
        name: "سوبر نيتروجين بلس",
        category: "منشطات نمو",
        image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=800",
        description: "سماد نيتروجيني عالي التركيز مصمم خصيصاً للمراحل الأولى من عمر النبات لضمان نمو خضري قوي.",
        usage: [
            "يستخدم بمعدل 2 لتر للفدان رياً بالتنقيط.",
            "يكرر كل 15 يوم خلال مرحلة النمو الخضري."
        ]
    },
    {
        id: 2,
        name: "فوسفو باور",
        category: "محفزات جذور",
        image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800",
        description: "مركب عالي الفسفور يعمل على تقوية الشعيرات الجذرية وتهيئتها لامتصاص العناصر.",
        usage: [
            "يستخدم مرة واحدة عند الشتلات.",
            "يرش ورقياً بمعدل 1.5 سم لكل لتر ماء."
        ]
    },
    {
        id: 3,
        name: "بوتاسيوم جولد",
        category: "تحجيم ثمار",
        image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=800",
        description: "سماد بوتاسيوم نقي لزيادة حجم الثمار وتحسين نسبة السكر واللون.",
        usage: [
            "يستخدم بعد العقد مباشرة.",
            "معدل الاستخدام: 3 لتر للفدان."
        ]
    }
];

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. القائمة الجانبية (Mobile Menu)
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // 2. تعبئة صفحة التفاصيل (Product Details Logic)
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId && document.getElementById('p-name')) {
        const product = productsDB.find(p => p.id == productId);
        if (product) {
            document.getElementById('p-image').src = product.image;
            document.getElementById('p-name').innerText = product.name;
            document.getElementById('p-category').innerText = product.category;
            document.getElementById('p-desc').innerText = product.description;
            
            const usageList = document.getElementById('p-usage');
            usageList.innerHTML = ''; // تنظيف القائمة القديمة
            product.usage.forEach(item => {
                const li = document.createElement('li');
                li.innerText = item;
                usageList.appendChild(li);
            });
            document.title = `${product.name} | نماء للأسمدة`;
        }
    }

    // 3. تأثير الظهور عند السكرول (Scroll Reveal)
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // تشغيل أولي

    // 4. عداد الأرقام (Counters)
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;
    const statsSection = document.querySelector('.stats-section');
    
    if(statsSection) {
        window.addEventListener('scroll', () => {
            if(window.scrollY + window.innerHeight > statsSection.offsetTop && !hasCounted) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const updateCount = () => {
                        const count = +counter.innerText.replace('+','');
                        const inc = target / 200;
                        if(count < target) {
                            counter.innerText = '+' + Math.ceil(count + inc);
                            setTimeout(updateCount, 15);
                        } else { counter.innerText = '+' + target; }
                    };
                    updateCount();
                });
                hasCounted = true;
            }
        });
    }
});