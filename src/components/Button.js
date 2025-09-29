/**
 * Componente de botón interactivo
 * Con animaciones y efectos hover
 */

class Button {
    constructor(options = {}) {
        this.options = {
            text: options.text || 'Botón',
            type: options.type || 'primary', // primary, secondary, outline, ghost
            size: options.size || 'medium', // small, medium, large
            icon: options.icon || '',
            href: options.href || '',
            onClick: options.onClick || null,
            disabled: options.disabled || false,
            loading: options.loading || false,
            ...options
        };
        
        this.init();
    }

    init() {
        this.createButton();
        this.bindEvents();
    }

    createButton() {
        const buttonHTML = `
            <button 
                class="btn btn-${this.options.type} btn-${this.options.size} ${this.options.disabled ? 'disabled' : ''} ${this.options.loading ? 'loading' : ''}"
                ${this.options.href ? `onclick="window.location.href='${this.options.href}'"` : ''}
                ${this.options.disabled ? 'disabled' : ''}
                data-aos="fade-up"
            >
                ${this.options.loading ? `
                    <span class="btn-spinner"></span>
                ` : ''}
                
                ${this.options.icon ? `
                    <i class="${this.options.icon}"></i>
                ` : ''}
                
                <span class="btn-text">${this.options.text}</span>
                
                ${this.options.href ? `
                    <i class="fas fa-arrow-right btn-arrow"></i>
                ` : ''}
            </button>
        `;
        
        return buttonHTML;
    }

    bindEvents() {
        // Add ripple effect
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (this.options.disabled || this.options.loading) {
                    e.preventDefault();
                    return;
                }
                
                this.createRipple(e, button);
                
                if (this.options.onClick) {
                    this.options.onClick(e);
                }
            });
        });
    }

    createRipple(event, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Static method to create button groups
    static createButtonGroup(container, buttons) {
        const containerElement = document.querySelector(container);
        if (!containerElement) return;
        
        const buttonsHTML = buttons.map(buttonData => {
            const button = new Button(buttonData);
            return button.createButton();
        }).join('');
        
        containerElement.innerHTML = buttonsHTML;
        
        // Initialize events for all buttons
        buttons.forEach(() => {
            const button = new Button();
            button.bindEvents();
        });
    }

    // Method to show loading state
    showLoading() {
        const button = document.querySelector('.btn');
        if (button) {
            button.classList.add('loading');
            button.disabled = true;
        }
    }

    // Method to hide loading state
    hideLoading() {
        const button = document.querySelector('.btn');
        if (button) {
            button.classList.remove('loading');
            button.disabled = false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Button;
}
