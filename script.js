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