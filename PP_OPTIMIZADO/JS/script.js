// ===================== CARRUSEL HERO =====================
let currentSlide = 0;

function initCarousel() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 6500);
}

// ===================== NAVEGACIÓN SUAVE =====================
function initSmoothScrolling() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Solo aplicar smooth scroll si es un ancla interna (#algo)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const topPos = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({ top: topPos, behavior: 'smooth' });
                }
            }
            // Si es un enlace a otra página (sala1.html, conclusion.html, etc.) 
            // NO hacemos preventDefault → se comporta normalmente
        });
    });
}

// ===================== HEADER SCROLL =====================
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
}

// ===================== MENÚ HAMBURGUESA =====================
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.museum-nav');
    
    if (!hamburger || !nav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        nav.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ===================== CAMBIO DE TEMA =====================
function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) {
        console.error("Botón de tema no encontrado");
        return;
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    toggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        toggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
        
        localStorage.setItem('theme', newTheme);
        console.log("✅ Tema cambiado a:", newTheme);
    });
}

// ===================== INICIALIZACIÓN =====================
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initSmoothScrolling();
    initHeaderScroll();
    initHamburger();
    initThemeToggle();
});