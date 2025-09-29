/**
 * Sistema de animaciones para PortfolioAdri
 * Incluye animaciones de scroll, hover effects y transiciones suaves
 */

class AnimationManager {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParallaxEffects();
        this.setupLoadingAnimations();
        this.bindEvents();
    }

    setupScrollAnimations() {
        // Intersection Observer para animaciones al hacer scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observar elementos con data-aos
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(element => {
            this.scrollObserver.observe(element);
        });
    }

    animateElement(element) {
        if (this.animatedElements.has(element)) return;
        
        this.animatedElements.add(element);
        const animationType = element.dataset.aos;
        const delay = element.dataset.aosDelay || 0;
        
        setTimeout(() => {
            element.classList.add('aos-animate');
            this.applyAnimation(element, animationType);
        }, delay);
    }

    applyAnimation(element, type) {
        const animations = {
            'fade-up': () => this.fadeUp(element),
            'fade-down': () => this.fadeDown(element),
            'fade-left': () => this.fadeLeft(element),
            'fade-right': () => this.fadeRight(element),
            'fade-in': () => this.fadeIn(element),
            'scale-in': () => this.scaleIn(element),
            'slide-up': () => this.slideUp(element),
            'slide-down': () => this.slideDown(element),
            'zoom-in': () => this.zoomIn(element),
            'flip-left': () => this.flipLeft(element),
            'flip-right': () => this.flipRight(element)
        };

        if (animations[type]) {
            animations[type]();
        }
    }

    // Métodos de animación específicos
    fadeUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeDown(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    fadeLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }

    fadeIn(element) {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    }

    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    slideUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    slideDown(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-50px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }

    zoomIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5)';
        element.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }

    flipLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'perspective(1000px) rotateY(90deg)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(1000px) rotateY(0deg)';
        });
    }

    flipRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'perspective(1000px) rotateY(-90deg)';
        element.style.transition = 'all 0.8s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'perspective(1000px) rotateY(0deg)';
        });
    }

    setupHoverAnimations() {
        // Animaciones de hover para botones
        const buttons = document.querySelectorAll('.nav-button, .btn, .social-link');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });

        // Animaciones de hover para tarjetas
        const cards = document.querySelectorAll('.profile-card, .card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addCardHoverEffect(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeCardHoverEffect(e.target);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-3px) scale(1.02)';
        element.style.boxShadow = '0 10px 30px rgba(255, 215, 0, 0.3)';
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
        element.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    addCardHoverEffect(element) {
        element.style.transform = 'translateY(-5px) rotateX(2deg)';
        element.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.2)';
        element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    removeCardHoverEffect(element) {
        element.style.transform = 'translateY(0) rotateX(0deg)';
        element.style.boxShadow = '';
        element.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    setupParallaxEffects() {
        // Efecto parallax para el fondo de estrellas
        const stars = document.querySelector('.stars');
        if (stars) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                stars.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    setupLoadingAnimations() {
        // Animación de carga inicial
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            this.animateOnLoad();
        });
    }

    animateOnLoad() {
        const heroElements = document.querySelectorAll('.profile-card, .nav-button, .social-link');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.6s ease-out';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            }, index * 100);
        });
    }

    bindEvents() {
        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Animación de typing para el nombre
        this.setupTypingAnimation();
    }

    setupTypingAnimation() {
        const nameElement = document.querySelector('.profile-name');
        if (nameElement) {
            const text = nameElement.textContent;
            nameElement.textContent = '';
            nameElement.style.borderRight = '2px solid var(--primary-color)';
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    nameElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    setTimeout(() => {
                        nameElement.style.borderRight = 'none';
                    }, 1000);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    // Método para crear efectos de partículas
    createParticleEffect(element) {
        const particles = [];
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            
            document.body.appendChild(particle);
            particles.push(particle);
            
            // Animar partícula
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    // Método para animar contadores
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
}

// Inicializar el gestor de animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationManager;
}
