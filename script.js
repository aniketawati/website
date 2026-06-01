// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.floating-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .contact-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Enhanced glitch effect on hover
function enhanceGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.style.animationDuration = '0.1s';
        });
        
        glitchElement.addEventListener('mouseleave', () => {
            glitchElement.style.animationDuration = '2s';
        });
    }
}

// Floating particles background
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.classList.add('particles');
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
        `;
        
        particlesContainer.appendChild(particle);
        animateParticle(particle);
    }
}

function animateParticle(particle) {
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = 10000 + Math.random() * 20000;
    
    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';
    
    particle.animate([
        {
            transform: 'translate(0, 0) scale(0)',
            opacity: 0
        },
        {
            transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(1)`,
            opacity: 0.7,
            offset: 0.1
        },
        {
            transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-in-out'
    }).addEventListener('finish', () => animateParticle(particle));
}

// Easter egg - Konami code
let konamiSequence = [];
const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

function handleKonamiCode(event) {
    konamiSequence.push(event.code);
    
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.join(',') === konamiCode.join(',')) {
        activateEasterEgg();
        konamiSequence = [];
    }
}

function activateEasterEgg() {
    const body = document.body;
    body.style.filter = 'hue-rotate(180deg) saturate(2)';
    
    setTimeout(() => {
        body.style.filter = 'none';
        alert('🎉 You found the secret! You are a true digital explorer!');
    }, 3000);
}

// Cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(99, 102, 241, ${1 - i / trailLength});
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    document.addEventListener('mousemove', (e) => {
        trail.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.left = e.clientX + 'px';
                dot.style.top = e.clientY + 'px';
            }, index * 10);
        });
    });
}

// Add CSS animations for scroll-triggered elements
const style = document.createElement('style');
style.textContent = `
    .skill-card, .project-card, .contact-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .skill-card.animate, .project-card.animate, .contact-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .floating-nav a.active {
        color: var(--accent-color) !important;
        background: rgba(245, 158, 11, 0.1) !important;
    }
`;
document.head.appendChild(style);

// Keep the footer copyright year current
function updateFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    updateActiveNav();
    animateOnScroll();
    enhanceGlitchEffect();
    createFloatingParticles();
    createCursorTrail();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        updateActiveNav();
        animateOnScroll();
        parallaxEffect();
    });
    
    document.addEventListener('keydown', handleKonamiCode);
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization - throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNav();
    animateOnScroll();
    parallaxEffect();
}, 16)); // ~60fps