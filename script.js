document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ANIMASI KETIKAN (TYPEWRITER) DI HERO SECTION
    // ==========================================
    const textToType = "MESHAAL PARIS";
    const typingElement = document.getElementById("typing");
    let index = 0;

    function typeWriter() {
        if (typingElement && index < textToType.length) {
            typingElement.innerHTML += textToType.charAt(index);
            index++;
            setTimeout(typeWriter, 290); // Kecepatan ketik (ms)
        }
    }

    // Jalankan efek ketik saat halaman dibuka
    typeWriter();


    // ==========================================
    // 2. COUNTER ANIMATION UNTUK STATS
    // ==========================================
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimatedStats = false;

    function runCounters() {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 40;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 50);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }


    // ==========================================
    // 3. EFEK ERROR DYNAMIC SAAT SCROLL KE SECTION ABOUT
    // ==========================================
    const aboutSection = document.querySelector('.about-section');
    const mainTitle = document.querySelector('.main-title');

    window.addEventListener('scroll', () => {
        if (aboutSection) {
            const sectionTop = aboutSection.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight / 1.3;

            if (sectionTop < triggerPoint) {
                // Jalankan counter jika belum berjalan
                if (!hasAnimatedStats) {
                    runCounters();
                    hasAnimatedStats = true;
                }

                // Tambahkan shockwave glitch sementara saat pertama kali di-scroll
                if (mainTitle && !mainTitle.classList.contains('error-flicker')) {
                    mainTitle.classList.add('error-flicker');
                    setTimeout(() => {
                        mainTitle.classList.remove('error-flicker');
                    }, 1000);
                }
            }
        }
    });

    // Random Text Corruption Effect pada Teks Sub-Heading
    const errorTextElement = document.querySelector('.error-text');
    const originalText = "// TENTANG_SAYA_ [SYSTEM_CORRUPTED]";
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789";

    if (errorTextElement) {
        setInterval(() => {
            let corruptedStr = "";
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.15) { // 15% peluang karakter rusak
                    corruptedStr += glitchChars.charAt(Math.floor(Math.random() * glitchChars.length));
                } else {
                    corruptedStr += originalText[i];
                }
            }
            errorTextElement.innerText = corruptedStr;

            // Balikkan ke teks normal setelah kedip singkat
            setTimeout(() => {
                errorTextElement.innerText = originalText;
            }, 150);
        }, 2500);
    }


    // ==========================================
    // 4. FITUR BARU: 3D SCROLL & POP-UP REVEAL
    // ==========================================
    
    // A. Mengirimkan nilai scroll ke CSS untuk efek miring 3D secara dinamis
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`);
    });

    // B. Intersection Observer: Membuat elemen terangkat secara 3D saat masuk viewport
    const observerOptions = {
        threshold: 0.15
    };

    const observer3D = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Mendaftarkan elemen-elemen untuk diberi efek 3D saat di-scroll
    const elementsToAnimate = document.querySelectorAll(
        '.bento-card, .stat-card, .stack-card, .project-card, .tools-header'
    );
    
    elementsToAnimate.forEach((el) => {
        el.classList.add('reveal-3d');
        observer3D.observe(el);
    });

    // C. Efek Interactive Mouse Tilt (Kemiringan 3D saat Hover di Kartu Bento)
    const tiltCards = document.querySelectorAll('.bento-card, .stat-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -12; // Sudut kemiringan vertikal
            const rotateY = ((x - centerX) / centerX) * 12;  // Sudut kemiringan horizontal

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
        });
    });

});

document.addEventListener("DOMContentLoaded", () => {
    // Kunci scroll saat loading berlangsung
    document.body.classList.add("loading");

    const counterElement = document.getElementById("loader-counter");
    const barElement = document.getElementById("loader-bar");
    const introScreen = document.getElementById("intro-screen");

    let count = 0;

    // Animasi penghitung 0% - 100%
    const updateLoader = setInterval(() => {
        count += Math.floor(Math.random() * 8) + 2; // Menambah angka secara acak agar terasa natural

        if (count >= 100) {
            count = 100;
            clearInterval(updateLoader);

            // Beri sedikit jeda di 100% sebelum intro menghilang
            setTimeout(() => {
                introScreen.classList.add("fade-out");
                document.body.classList.remove("loading");
            }, 400);
        }

        counterElement.innerText = `${count}%`;
        barElement.style.width = `${count}%`;
    }, 40);
});
const ring = document.querySelector(".ring");

let isDown = false;

let startX;

let rotateY = 0;

ring.addEventListener("mousedown",(e)=>{

isDown=true;

startX=e.clientX;

ring.style.animation="none";

});

window.addEventListener("mouseup",()=>{

isDown=false;

});

window.addEventListener("mousemove",(e)=>{

if(!isDown)return;

let walk=e.clientX-startX;

rotateY+=walk*0.3;

ring.style.transform=`rotateY(${rotateY}deg)`;

startX=e.clientX;

});

/* ==========================================
   5. STAR FIELD BACKGROUND
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const hero = document.querySelector(".hero-section");

    // Membuat container jika belum ada
    let starsContainer = document.getElementById("stars");

    if (!starsContainer) {
        starsContainer = document.createElement("div");
        starsContainer.id = "stars";
        hero.prepend(starsContainer);
    }

    const totalStars = 700;

    for (let i = 0; i < totalStars; i++) {

        const star = document.createElement("span");
        star.classList.add("star");

        // ukuran acak
        const size = Math.random() * 2.5 + 0.5;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // posisi acak
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        // opacity acak
        star.style.opacity = Math.random();

        // animasi berbeda-beda
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${2 + Math.random() * 6}s`;

        // glow beberapa bintang
        if (Math.random() > 0.94) {
            star.style.boxShadow = "0 0 10px white";
            star.style.width = "3px";
            star.style.height = "3px";
        }

        starsContainer.appendChild(star);
    }

});

/* ===================================
   GALAXY PREMIUM
=================================== */

document.addEventListener("DOMContentLoaded",()=>{

const space=document.getElementById("space");

// ===================
// STARS
// ===================

for(let i=0;i<800;i++){

    const star=document.createElement("div");

    star.className="star";

    const size=Math.random()*2+0.5;

    star.style.width=size+"px";
    star.style.height=size+"px";

    star.style.left=Math.random()*100+"%";
    star.style.top=Math.random()*100+"%";

    star.style.opacity=Math.random();

    star.style.animationDuration=
    (2+Math.random()*6)+"s";

    star.style.animationDelay=
    Math.random()*6+"s";

    if(Math.random()>0.98){

        star.style.boxShadow="0 0 12px white";

        star.style.width="3px";
        star.style.height="3px";

    }

    space.appendChild(star);

}

// ===================
// SHOOTING STARS
// ===================

function createMeteor(){

    const meteor=document.createElement("div");

    meteor.className="meteor";

    meteor.style.left=Math.random()*window.innerWidth+"px";

    meteor.style.top=Math.random()*300+"px";

    meteor.style.animationDuration=
    (2+Math.random()*2)+"s";

    space.appendChild(meteor);

    setTimeout(()=>{

        meteor.remove();

    },4000);

}

setInterval(createMeteor,1200);

});

/* =====================================================
   FUTURISTIC CURSOR SYSTEM
   ===================================================== */

const cursor = document.querySelector(".cursor");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;


/* =====================================================
   MOUSE POSITION
   ===================================================== */

document.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});


/* =====================================================
   SMOOTH CURSOR
   ===================================================== */

function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    requestAnimationFrame(animateCursor);

}

animateCursor();


/* =====================================================
   HOVER ELEMENT
   ===================================================== */

const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .gallery-item, input, textarea, .nav-link"
);


hoverElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

        cursor.classList.add("hover");

        const text =
            element.dataset.cursor ||
            (
                element.tagName === "A"
                ? "OPEN"
                : "VIEW"
            );

        document.querySelector(".cursor-label").textContent = text;

    });


    element.addEventListener("mouseleave", () => {

        cursor.classList.remove("hover");

        document.querySelector(".cursor-label").textContent =
            "EXPLORE";

    });

});


/* =====================================================
   CLICK ANIMATION
   ===================================================== */

document.addEventListener("mousedown", () => {

    cursor.classList.add("click");

});


document.addEventListener("mouseup", () => {

    cursor.classList.remove("click");

});
