/**
 * Sistema de interactividad para PortfolioAdri
 * Maneja navegación, formularios, modales y efectos interactivos
 */

class InteractivityManager {
    constructor() {
        this.modals = new Map();
        this.forms = new Map();
        this.navigation = null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupModals();
        this.setupForms();
        this.setupScrollEffects();
        this.setupKeyboardNavigation();
        this.bindGlobalEvents();
    }

    setupNavigation() {
        // Navegación móvil
        const navbarToggle = document.getElementById('navbar-toggle');
        const navbarMenu = document.getElementById('navbar-menu');
        
        if (navbarToggle && navbarMenu) {
            navbarToggle.addEventListener('click', () => {
                navbarMenu.classList.toggle('active');
                navbarToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Cerrar menú al hacer clic en enlaces
            const navLinks = navbarMenu.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navbarMenu.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
        }

        // Efecto de scroll en navbar
        let lastScrollY = window.scrollY;
        const navbar = document.getElementById('navbar');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Ocultar/mostrar navbar al hacer scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupModals() {
        // Crear modal base si no existe
        if (!document.getElementById('modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.id = 'modal-container';
            modalContainer.className = 'modal-container';
            modalContainer.innerHTML = `
                <div class="modal-overlay" id="modal-overlay">
                    <div class="modal-content" id="modal-content">
                        <button class="modal-close" id="modal-close">&times;</button>
                        <div class="modal-body" id="modal-body"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modalContainer);
        }

        // Event listeners para modales
        const modalOverlay = document.getElementById('modal-overlay');
        const modalClose = document.getElementById('modal-close');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }

        // Cerrar modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(content, title = '') {
        const modalContainer = document.getElementById('modal-container');
        const modalBody = document.getElementById('modal-body');
        const modalContent = document.getElementById('modal-content');
        
        if (title) {
            modalContent.innerHTML = `
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" id="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modal-body">${content}</div>
            `;
        } else {
            modalBody.innerHTML = content;
        }
        
        modalContainer.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Re-bind close button
        const newCloseBtn = document.getElementById('modal-close');
        if (newCloseBtn) {
            newCloseBtn.addEventListener('click', () => this.closeModal());
        }
    }

    closeModal() {
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.forms.set(form.id || `form-${Math.random()}`, form);
            
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        });
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Mostrar loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío (reemplazar con lógica real)
        setTimeout(() => {
            this.showNotification('¡Mensaje enviado correctamente!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    setupScrollEffects() {
        // Smooth scroll para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; // Ajustar por navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Efecto parallax para elementos específicos
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * element.dataset.parallax;
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    setupKeyboardNavigation() {
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            // Navegación con Tab
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
            
            // Atajos de teclado
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'k':
                        e.preventDefault();
                        this.focusSearch();
                        break;
                    case '/':
                        e.preventDefault();
                        this.showKeyboardShortcuts();
                        break;
                }
            }
        });

        // Remover clase de navegación por teclado al usar mouse
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    focusSearch() {
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    showKeyboardShortcuts() {
        const shortcuts = `
            <div class="keyboard-shortcuts">
                <h3>Atajos de teclado</h3>
                <ul>
                    <li><kbd>Ctrl</kbd> + <kbd>K</kbd> - Buscar</li>
                    <li><kbd>Ctrl</kbd> + <kbd>/</kbd> - Mostrar atajos</li>
                    <li><kbd>Esc</kbd> - Cerrar modales</li>
                    <li><kbd>Tab</kbd> - Navegación</li>
                </ul>
            </div>
        `;
        this.openModal(shortcuts, 'Atajos de teclado');
    }

    bindGlobalEvents() {
        // Efectos de hover para elementos interactivos
        this.setupHoverEffects();
        
        // Lazy loading para imágenes
        this.setupLazyLoading();
        
        // Copiar al portapapeles
        this.setupCopyToClipboard();
        
        // Notificaciones
        this.setupNotifications();
    }

    setupHoverEffects() {
        // Efecto ripple para botones
        document.querySelectorAll('.btn, .nav-button').forEach(button => {
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 215, 0, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    setupCopyToClipboard() {
        document.querySelectorAll('[data-copy]').forEach(element => {
            element.addEventListener('click', async () => {
                const text = element.dataset.copy;
                try {
                    await navigator.clipboard.writeText(text);
                    this.showNotification('¡Copiado al portapapeles!', 'success');
                } catch (err) {
                    this.showNotification('Error al copiar', 'error');
                }
            });
        });
    }

    setupNotifications() {
        // Crear contenedor de notificaciones
        if (!document.getElementById('notification-container')) {
            const container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            document.body.appendChild(container);
        }
    }

    showNotification(message, type = 'info', duration = 3000) {
        const container = document.getElementById('notification-container');
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        container.appendChild(notification);
        
        // Auto-remove
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }

    // Método para crear tooltips
    createTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);
        
        const updateTooltip = (e) => {
            tooltip.style.left = e.pageX + 10 + 'px';
            tooltip.style.top = e.pageY - 10 + 'px';
        };
        
        element.addEventListener('mouseenter', (e) => {
            tooltip.classList.add('active');
            updateTooltip(e);
        });
        
        element.addEventListener('mouseleave', () => {
            tooltip.classList.remove('active');
        });
        
        element.addEventListener('mousemove', updateTooltip);
    }

    // Método para crear dropdowns
    createDropdown(trigger, content) {
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-trigger">${trigger}</div>
            <div class="dropdown-content">${content}</div>
        `;
        
        const triggerElement = dropdown.querySelector('.dropdown-trigger');
        const contentElement = dropdown.querySelector('.dropdown-content');
        
        triggerElement.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });
        
        return dropdown;
    }
}

// Inicializar el gestor de interactividad cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new InteractivityManager();
});

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InteractivityManager;
}
