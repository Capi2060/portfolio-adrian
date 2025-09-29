/**
 * Componente de tarjeta reutilizable
 * Para mostrar información de servicios, proyectos, etc.
 */

class Card {
    constructor(options = {}) {
        this.options = {
            title: options.title || '',
            description: options.description || '',
            icon: options.icon || '',
            image: options.image || '',
            link: options.link || '',
            tags: options.tags || [],
            ...options
        };
        
        this.init();
    }

    init() {
        this.createCard();
        this.bindEvents();
    }

    createCard() {
        const cardHTML = `
            <div class="card" data-aos="fade-up" data-aos-delay="${this.options.delay || 0}">
                ${this.options.image ? `
                    <div class="card-image">
                        <img src="${this.options.image}" alt="${this.options.title}" loading="lazy">
                    </div>
                ` : ''}
                
                <div class="card-content">
                    ${this.options.icon ? `
                        <div class="card-icon">
                            <i class="${this.options.icon}"></i>
                        </div>
                    ` : ''}
                    
                    <h3 class="card-title">${this.options.title}</h3>
                    <p class="card-description">${this.options.description}</p>
                    
                    ${this.options.tags.length > 0 ? `
                        <div class="card-tags">
                            ${this.options.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                    
                    ${this.options.link ? `
                        <a href="${this.options.link}" class="card-link">
                            Ver más <i class="fas fa-arrow-right"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        return cardHTML;
    }

    bindEvents() {
        // Add hover effects and animations
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover');
            });
        });
    }

    // Static method to create multiple cards
    static createCardGrid(container, cards) {
        const containerElement = document.querySelector(container);
        if (!containerElement) return;
        
        const cardsHTML = cards.map((cardData, index) => {
            const card = new Card({...cardData, delay: index * 100});
            return card.createCard();
        }).join('');
        
        containerElement.innerHTML = cardsHTML;
        
        // Initialize animations for all cards
        cards.forEach((_, index) => {
            const card = new Card();
            card.bindEvents();
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Card;
}
