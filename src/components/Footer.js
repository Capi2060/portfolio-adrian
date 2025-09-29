/**
 * Componente de pie de página
 * Incluye enlaces sociales y información de contacto
 */

class Footer {
    constructor() {
        this.init();
    }

    init() {
        this.createFooter();
        this.bindEvents();
    }

    createFooter() {
        const footerHTML = `
            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-content">
                        <div class="footer-section">
                            <h3 class="footer-title">PortfolioAdri</h3>
                            <p class="footer-description">
                                Desarrollador y Manager especializado en soluciones web modernas.
                            </p>
                        </div>
                        
                        <div class="footer-section">
                            <h4 class="footer-subtitle">Enlaces</h4>
                            <ul class="footer-links">
                                <li><a href="about.html">Sobre mí</a></li>
                                <li><a href="services.html">Servicios</a></li>
                                <li><a href="projects.html">Proyectos</a></li>
                                <li><a href="contact.html">Contacto</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-section">
                            <h4 class="footer-subtitle">Redes Sociales</h4>
                            <div class="social-links">
                                <a href="https://discord.com/users/.adriii_" class="social-link discord" target="_blank" rel="noopener">
                                    <svg class="social-icon" viewBox="0 0 24 24">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                                    </svg>
                                    Discord
                                </a>
                                <a href="mailto:sncorreo4@gmail.com" class="social-link email" target="_blank" rel="noopener">
                                    <svg class="social-icon" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                                    </svg>
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p class="footer-copyright">
                            © 2024 PortfolioAdri. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        `;
        
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    bindEvents() {
        // Smooth scroll for anchor links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href.endsWith('.html')) {
                    window.location.href = href;
                }
            });
        });
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Footer();
});
