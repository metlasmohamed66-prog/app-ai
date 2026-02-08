/* ==========================================================================
   SITE SAINT-VALENTIN POUR KENZA
   JavaScript - Interactions & Animations
   ========================================================================== */

(function () {
    'use strict';

    /* ======================================================================
       1. Curseur Personnalise (coeur)
       ====================================================================== */

    const cursorHeart = document.getElementById('cursor-heart');

    if (window.matchMedia('(hover: hover)').matches && cursorHeart) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursorHeart.style.left = cursorX + 'px';
            cursorHeart.style.top = cursorY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Trail de mini-coeurs au clic
        document.addEventListener('click', (e) => {
            for (let i = 0; i < 6; i++) {
                createClickHeart(e.clientX, e.clientY);
            }
        });

        function createClickHeart(x, y) {
            const heart = document.createElement('div');
            heart.innerHTML = '&#10084;';
            heart.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                color: #e74c6f;
                font-size: ${12 + Math.random() * 16}px;
                pointer-events: none;
                z-index: 99998;
                opacity: 1;
                transform: translate(-50%, -50%);
                transition: all ${0.8 + Math.random() * 0.6}s ease-out;
            `;
            document.body.appendChild(heart);

            requestAnimationFrame(() => {
                heart.style.opacity = '0';
                heart.style.transform = `translate(${-30 + Math.random() * 60}px, ${-60 - Math.random() * 40}px) scale(0.3) rotate(${Math.random() * 60 - 30}deg)`;
            });

            setTimeout(() => heart.remove(), 1500);
        }
    }

    /* ======================================================================
       2. Canvas - Coeurs Flottants
       ====================================================================== */

    const canvas = document.getElementById('hearts-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    let hearts = [];

    function resizeCanvas() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createHeart() {
        return {
            x: Math.random() * (canvas ? canvas.width : window.innerWidth),
            y: (canvas ? canvas.height : window.innerHeight) + 20,
            size: 8 + Math.random() * 15,
            speedY: 0.3 + Math.random() * 0.8,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: 0.1 + Math.random() * 0.4,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            color: ['#e74c6f', '#ff6b8a', '#f8b4c8', '#d4a574'][Math.floor(Math.random() * 4)]
        };
    }

    function drawHeart(heart) {
        if (!ctx) return;
        ctx.save();
        ctx.translate(heart.x, heart.y);
        ctx.rotate(heart.rotation);
        ctx.globalAlpha = heart.opacity;
        ctx.fillStyle = heart.color;

        const s = heart.size;
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, -s * 0.8, -s, -s * 0.3, 0, s * 0.5);
        ctx.bezierCurveTo(s, -s * 0.3, s * 0.5, -s * 0.8, 0, -s * 0.3);
        ctx.fill();

        ctx.restore();
    }

    function animateHearts() {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ajouter de nouveaux coeurs
        if (hearts.length < 25 && Math.random() < 0.03) {
            hearts.push(createHeart());
        }

        hearts.forEach((heart, index) => {
            heart.y -= heart.speedY;
            heart.x += heart.speedX + Math.sin(heart.y * 0.01) * 0.3;
            heart.rotation += heart.rotationSpeed;

            if (heart.y < -30) {
                hearts.splice(index, 1);
            } else {
                drawHeart(heart);
            }
        });

        requestAnimationFrame(animateHearts);
    }

    if (canvas && ctx) {
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        animateHearts();
    }

    /* ======================================================================
       3. Petales de Roses
       ====================================================================== */

    const petalsContainer = document.getElementById('petals-container');

    function createPetal() {
        if (!petalsContainer) return;
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = 8 + Math.random() * 14;
        const startX = Math.random() * 100;
        const duration = 8 + Math.random() * 8;
        const delay = Math.random() * 5;
        const hue = 340 + Math.random() * 30;

        petal.style.cssText = `
            left: ${startX}%;
            width: ${size}px;
            height: ${size}px;
            background: hsl(${hue}, 80%, 70%);
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            opacity: ${0.3 + Math.random() * 0.4};
        `;

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, (duration + delay) * 1000);
    }

    // Creer des petales periodiquement
    setInterval(createPetal, 800);
    // Creer quelques petales initiaux
    for (let i = 0; i < 8; i++) {
        setTimeout(createPetal, i * 200);
    }

    /* ======================================================================
       4. Ecran Enveloppe
       ====================================================================== */

    const envelopeScreen = document.getElementById('envelope-screen');
    const heroSection = document.getElementById('hero');
    const envelopeWrapper = document.querySelector('.envelope-wrapper');

    if (envelopeWrapper && envelopeScreen && heroSection) {
        envelopeWrapper.addEventListener('click', () => {
            envelopeScreen.classList.add('hide');

            setTimeout(() => {
                envelopeScreen.style.display = 'none';
                heroSection.classList.add('active');
                heroSection.style.display = 'flex';
                document.getElementById('side-nav').classList.add('visible');
            }, 800);
        });
    }

    /* ======================================================================
       5. Scroll Reveal (Intersection Observer)
       ====================================================================== */

    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                setTimeout(() => {
                    el.classList.add('visible');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ======================================================================
       6. Animation des lignes du Poeme
       ====================================================================== */

    const poemSection = document.getElementById('poem');
    const poemLines = document.querySelectorAll('.poem-line');

    const poemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                poemLines.forEach(line => {
                    const delay = parseInt(line.dataset.delay) || 0;
                    setTimeout(() => {
                        line.classList.add('visible');
                    }, delay);
                });
                poemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (poemSection) {
        poemObserver.observe(poemSection);
    }

    /* ======================================================================
       7. Carousel des Raisons
       ====================================================================== */

    const slides = document.querySelectorAll('.reason-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;
    let autoSlideInterval;

    function goToSlide(index) {
        const current = document.querySelector('.reason-slide.active');
        if (current) {
            current.classList.remove('active');
            current.classList.add('exit-left');
            setTimeout(() => current.classList.remove('exit-left'), 600);
        }

        dots.forEach(d => d.classList.remove('active'));

        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        setTimeout(() => {
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }, 100);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            resetAutoSlide();
        });
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    startAutoSlide();

    /* ======================================================================
       8. Compteur a Rebours
       ====================================================================== */

    function updateCountdown() {
        const now = new Date();
        let valentine = new Date(now.getFullYear(), 1, 14); // 14 Fevrier

        // Si la Saint-Valentin est passee cette annee, viser l'annee prochaine
        if (now > valentine) {
            valentine = new Date(now.getFullYear() + 1, 1, 14);
        }

        const diff = valentine - now;

        if (diff <= 0) {
            // C'est la Saint-Valentin !
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.querySelector('.countdown-label').textContent =
                'Bonne Saint-Valentin, Kenza !';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* ======================================================================
       9. Navigation Laterale
       ====================================================================== */

    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.screen:not(#envelope-screen)');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navDots.forEach(dot => {
                    dot.classList.toggle('active', dot.dataset.section === sectionId);
                });
            }
        });
    }, {
        threshold: 0.4
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Smooth scroll pour les dots
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ======================================================================
       10. Bouton Musique (Web Audio API - melodie generee)
       ====================================================================== */

    const musicToggle = document.getElementById('music-toggle');
    let audioCtx = null;
    let isMuted = true;
    let melodyInterval = null;
    let gainNode = null;

    // Notes romantiques (frequences en Hz)
    const melody = [
        { freq: 523.25, dur: 0.4 },  // C5
        { freq: 659.25, dur: 0.4 },  // E5
        { freq: 783.99, dur: 0.6 },  // G5
        { freq: 698.46, dur: 0.4 },  // F5
        { freq: 659.25, dur: 0.4 },  // E5
        { freq: 523.25, dur: 0.6 },  // C5
        { freq: 587.33, dur: 0.4 },  // D5
        { freq: 523.25, dur: 0.4 },  // C5
        { freq: 493.88, dur: 0.6 },  // B4
        { freq: 523.25, dur: 0.4 },  // C5
        { freq: 659.25, dur: 0.4 },  // E5
        { freq: 587.33, dur: 0.8 },  // D5
        { freq: 523.25, dur: 0.4 },  // C5
        { freq: 440.00, dur: 0.4 },  // A4
        { freq: 493.88, dur: 0.6 },  // B4
        { freq: 523.25, dur: 1.0 },  // C5
    ];

    let noteIndex = 0;

    function playNote(freq, duration) {
        if (!audioCtx || !gainNode) return;

        const osc = audioCtx.createOscillator();
        const noteGain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
        noteGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 0.05);
        noteGain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + duration * 0.5);
        noteGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration);

        osc.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
    }

    function playMelody() {
        const note = melody[noteIndex];
        playNote(note.freq, note.dur);
        noteIndex = (noteIndex + 1) % melody.length;
    }

    function startMusic() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioCtx.createGain();
            gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gainNode.connect(audioCtx.destination);
        }

        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        noteIndex = 0;
        playMelody();
        melodyInterval = setInterval(playMelody, 500);
    }

    function stopMusic() {
        if (melodyInterval) {
            clearInterval(melodyInterval);
            melodyInterval = null;
        }
    }

    if (musicToggle) {
        musicToggle.classList.add('muted');

        musicToggle.addEventListener('click', () => {
            isMuted = !isMuted;
            musicToggle.classList.toggle('muted', isMuted);

            if (isMuted) {
                stopMusic();
            } else {
                startMusic();
            }
        });
    }

    /* ======================================================================
       11. Bouton Restart
       ====================================================================== */

    const restartBtn = document.getElementById('restart-btn');

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            // Reset tout
            const envelopeScreen = document.getElementById('envelope-screen');
            const heroSection = document.getElementById('hero');
            const sideNav = document.getElementById('side-nav');

            if (envelopeScreen) {
                envelopeScreen.style.display = 'flex';
                envelopeScreen.classList.remove('hide');
            }

            if (heroSection) {
                heroSection.classList.remove('active');
                heroSection.style.display = 'none';
            }

            if (sideNav) {
                sideNav.classList.remove('visible');
            }

            // Reset animations du poeme
            poemLines.forEach(line => line.classList.remove('visible'));

            // Reset les cartes de qualite
            document.querySelectorAll('.quality-card').forEach(card => {
                card.classList.remove('visible');
            });

            // Reset lettre et countdown wrapper
            document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                el.classList.remove('visible');
            });

            // Reset les mots de la section finale
            document.querySelectorAll('.word-by-word').forEach(word => {
                word.style.animation = 'none';
                word.offsetHeight; // Force reflow
                word.style.animation = '';
            });

            // Scroll en haut
            window.scrollTo({ top: 0, behavior: 'instant' });
        });
    }

    /* ======================================================================
       12. Effet de particules au survol des cartes
       ====================================================================== */

    document.querySelectorAll('.quality-card').forEach(card => {
        card.addEventListener('mouseenter', function (e) {
            for (let i = 0; i < 5; i++) {
                const sparkle = document.createElement('span');
                sparkle.innerHTML = '&#10084;';
                sparkle.style.cssText = `
                    position: absolute;
                    font-size: ${8 + Math.random() * 10}px;
                    color: #e74c6f;
                    pointer-events: none;
                    opacity: 0.8;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    transition: all 1s ease-out;
                    z-index: 10;
                `;
                this.appendChild(sparkle);

                requestAnimationFrame(() => {
                    sparkle.style.opacity = '0';
                    sparkle.style.transform = `translateY(-${30 + Math.random() * 30}px) scale(0.3)`;
                });

                setTimeout(() => sparkle.remove(), 1000);
            }
        });
    });

    /* ======================================================================
       13. Parallax subtil sur la section hero
       ====================================================================== */

    window.addEventListener('scroll', () => {
        const hero = document.getElementById('hero');
        if (!hero) return;

        const scrollY = window.scrollY;
        const heroContent = hero.querySelector('.hero-content');

        if (heroContent && scrollY < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.5;
        }
    });

})();
