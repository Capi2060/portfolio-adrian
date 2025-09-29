/**
 * Componente de navegación principal
 * Incluye menú responsive y animaciones
 */

class Navbar {
    constructor() {
        this.navbar = null;
        this.mobileMenu = null;
        this.hamburger = null;
        this.init();
    }

    init() {
        this.createNavbar();
        this.bindEvents();
    }

    createNavbar() {
        const navbarHTML = `
            <nav class="navbar" id="navbar">
                <div class="navbar-container">
                    <div class="navbar-brand">
                        <a href="index.html" class="brand-link">
                            <span class="brand-text">PortfolioAdri</span>
                        </a>
                    </div>
                    
                    <div class="navbar-menu" id="navbar-menu">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a href="index.html" class="nav-link active">Inicio</a>
                            </li>
                            <li class="nav-item">
                                <a href="about.html" class="nav-link">Sobre mí</a>
                            </li>
                            <li class="nav-item">
                                <a href="services.html" class="nav-link">Servicios</a>
                            </li>
                            <li class="nav-item">
                                <a href="projects.html" class="nav-link">Proyectos</a>
                            </li>
                            <li class="nav-item">
                                <a href="servers.html" class="nav-link">Servidores</a>
                            </li>
                            <li class="nav-item">
                                <a href="certificates.html" class="nav-link">Certificados</a>
                            </li>
                            <li class="nav-item">
                                <a href="reviews.html" class="nav-link">Reseñas</a>
                            </li>
                            <li class="nav-item">
                                <a href="contact.html" class="nav-link">Contacto</a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="navbar-toggle" id="navbar-toggle">
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                        <span class="hamburger-line"></span>
                    </div>
                </div>
            </nav>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
        this.navbar = document.getElementById('navbar');
        this.mobileMenu = document.getElementById('navbar-menu');
        this.hamburger = document.getElementById('navbar-toggle');
    }

    bindEvents() {
        // Toggle mobile menu
        this.hamburger.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    toggleMobileMenu() {
        this.mobileMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMobileMenu() {
        this.mobileMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navbar();
});
