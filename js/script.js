/* ============================================
   SABOR MEXICANO - JAVASCRIPT
   Bootstrap 5 Version
   ============================================ */

/* ============================================
   DOCUMENT READY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ Sabor Mexicano cargado correctamente');
    
    initializeSmoothScroll();
    initializeAnimations();
    initializeScrollEffects();
    initializeNavbarEffects();
});

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

function initializeSmoothScroll() {
    // Los enlaces con hash ya tienen scroll suave por HTML5
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#top' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                const offset = document.querySelector('.navbar').offsetHeight;
                const top = element.offsetTop - offset;
                
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ============================================
   INTERSECTION OBSERVER - ANIMACIONES AL SCROLL
   ============================================ */

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar animaciones a elementos
    const elementsToAnimate = document.querySelectorAll('.menu-card, .hours-card, .contact-card, .feature-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

/* ============================================
   PARALLAX EFFECT Y SCROLL EFFECTS
   ============================================ */

function initializeScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        
        // Parallax effect
        if (heroImage && scrollPosition < 800) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
        
        // Navbar shadow effect
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            }
        }
    });
}

/* ============================================
   NAVBAR EFFECTS
   ============================================ */

function initializeNavbarEffects() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - navbarHeight - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Cerrar navbar después de hacer clic en un enlace
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarMenu = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

/* ============================================
   CONTACT FUNCTIONS - WHATSAPP
   ============================================ */

function openWhatsApp() {
    const phoneNumber = '525512345678'; // Sin símbolos
    const message = 'Hola, me gustaría obtener más información sobre Sabor Mexicano o hacer una reserva.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar teléfono
function isValidPhone(phone) {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Detectar dispositivo móvil
function isMobileDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
}

// Copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('¡Copiado al portapapeles!', 'success');
    }).catch(err => {
        console.error('Error al copiar:', err);
    });
}

// Mostrar notificación
function showNotification(message, type = 'success', duration = 3000) {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // Puedes extender esto para mostrar notificaciones visuales
    // const notification = document.createElement('div');
    // notification.className = `alert alert-${type} alert-dismissible fade show`;
    // notification.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
    // document.body.appendChild(notification);
    // setTimeout(() => notification.remove(), duration);
}

// Formatos de fecha
function formatDate(date, locale = 'es-MX') {
    return date.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Generar ID único
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

/* ============================================
   OPTIMIZATION - DEBOUNCE & THROTTLE
   ============================================ */

function debounce(func, delay) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimizar scroll
const optimizedScroll = throttle(() => {
    // Operaciones en scroll se manejan en initializeScrollEffects()
}, 100);

window.addEventListener('scroll', optimizedScroll);

/* ============================================
   ERROR HANDLING & DEBUG
   ============================================ */

window.addEventListener('error', (event) => {
    console.error('Error capturado:', event.error);
});

// Log de debug
function logDebug(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[DEBUG] ${message}`, data || '');
    }
}

logDebug('Sabor Mexicano - Versión Bootstrap 5');
logDebug('User Agent:', navigator.userAgent);

if (isMobileDevice()) {
    logDebug('Dispositivo móvil detectado');
    document.body.classList.add('mobile-device');
}

/* ============================================
   PAGE LOAD & UNLOAD
   ============================================ */

// Agregar fade-in al cargar
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Log al descargar
window.addEventListener('beforeunload', () => {
    logDebug('Página siendo descargada');
});

/* ============================================
   ACCESSIBILITY & USABILITY
   ============================================ */

// Mejorar accesibilidad con ARIA labels donde sea necesario
document.querySelectorAll('.btn').forEach(btn => {
    if (!btn.getAttribute('aria-label')) {
        btn.setAttribute('role', 'button');
    }
});

// Permitir navegación con teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Cerrar navbars móviles si es necesario
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
            document.querySelector('.navbar-toggler').click();
        }
    }
});

/* ============================================
   PERFORMANCE MONITORING
   ============================================ */

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perf = window.performance.timing;
            const pageLoadTime = perf.loadEventEnd - perf.navigationStart;
            console.log(`⏱️ Tiempo de carga total: ${pageLoadTime}ms`);
        }, 0);
    });
}
