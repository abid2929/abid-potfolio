// ===================================
// PORTFOLIO APP - ENHANCED JAVASCRIPT
// ===================================

'use strict';

// Prevent page reload issues
let isNavigating = false;

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        const isExpanded = navLinks.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                mobileMenu.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            mobileMenu.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===================================
// DROPDOWN MENU FUNCTIONALITY
// ===================================
const dropdownMenus = document.querySelectorAll('.nav-more');

dropdownMenus.forEach(menu => {
    const trigger = menu.querySelector('.more-trigger');
    const dropdown = menu.querySelector('.dropdown-menu');
    
    if (trigger && dropdown) {
        // Close dropdown when clicking a link inside it
        dropdown.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Smooth scroll will be handled by the main smooth scroll handler
            });
        });
    }
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// ACTIVE NAVIGATION ON SCROLL
// ===================================
let scrollTimeout;
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === '#' + current || (current === '' && href === '#home')) {
                item.classList.add('active');
            }
        });
    }, 100);
}, { passive: true });

// ===================================
// STATS COUNTER ANIMATION
// ===================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        stat.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = target;
                    }
                };
                
                updateCounter();
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// SKILL BAR ANIMATION
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                if (width) {
                    bar.style.setProperty('--skill-width', width + '%');
                    setTimeout(() => {
                        bar.classList.add('animated');
                    }, 100);
                }
            });
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===================================
// EDUCATION TIMELINE ANIMATION
// ===================================
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }, index * 100);
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===================================
// EDUCATION PROGRESS BAR ANIMATION
// ===================================
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                const progress = progressBar.getAttribute('data-progress');
                if (progress) {
                    progressBar.style.width = progress + '%';
                }
            }
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const languageProgress = document.querySelectorAll('.language-progress');
languageProgress.forEach(item => {
    progressObserver.observe(item);
});

// ===================================
// ANIMATED CARDS ON SCROLL
// ===================================
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.setProperty('--i', index + 1);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }, index * 50);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Apply to food cards, game cards, passion cards, etc.
const animatedCards = document.querySelectorAll('.food-card, .game-card, .passion-card, .dream-item, .value-card, .hobby-card');
animatedCards.forEach(card => {
    cardObserver.observe(card);
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================
let scrollToTopBtn = document.querySelector('.scroll-to-top');

if (!scrollToTopBtn) {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);
}

let scrollBtnTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollBtnTimeout);
    scrollBtnTimeout = setTimeout(() => {
        if (window.pageYOffset > 400) {
            scrollToTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                scrollToTopBtn.style.display = 'none';
            }, 300);
        }
    }, 100);
}, { passive: true });

scrollToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.15) translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

// ===================================
// NAV BACKGROUND CHANGE ON SCROLL
// ===================================
const nav = document.querySelector('nav');
let navScrollTimeout;

if (nav) {
    window.addEventListener('scroll', () => {
        clearTimeout(navScrollTimeout);
        navScrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.98)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.boxShadow = 'none';
            }
        }, 50);
    }, { passive: true });
}

// ===================================
// EMAIL COPY FUNCTIONALITY
// ===================================
const emailElements = document.querySelectorAll('.info-value, .contact-item p');
emailElements.forEach(el => {
    if (el.textContent.includes('princeabid620@gmail.com')) {
        el.style.cursor = 'pointer';
        el.title = 'Click to copy email';
        
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText('princeabid620@gmail.com').then(() => {
                    const originalText = el.textContent;
                    el.textContent = '📋 Email copied!';
                    el.style.color = 'var(--green)';
                    
                    setTimeout(() => {
                        el.textContent = originalText;
                        el.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.log('Could not copy email:', err);
                });
            }
        });
    }
});

// ===================================
// FADE-IN ANIMATION FOR CARDS
// ===================================
const observeCards = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observeCards.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const cards = document.querySelectorAll(
    '.skill-card:not(.animated), .routine-card, .family-card, .info-row'
);

cards.forEach(card => {
    if (!card.style.opacity) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    }
    observeCards.observe(card);
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================
console.log(
    '%c Assalamu Alaikum! Welcome to Abid Islam\'s Portfolio ',
    'background: #DC143C; color: white; font-size: 18px; padding: 10px; border-radius: 5px;'
);
console.log(
    '%c 30 Para Hafez | Web Developer | Lifelong Learner 🚀',
    'color: #DC143C; font-size: 14px; font-weight: bold;'
);

// ===================================
// KEYBOARD NAVIGATION
// ===================================
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// TOUCH DEVICE DETECTION
// ===================================
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

if (isTouchDevice()) {
    document.body.classList.add('touch-device');
} else {
    document.body.classList.add('no-touch');
}

// ===================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ===================================
const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
};

setVH();
window.addEventListener('resize', setVH);

// ===================================
// ERROR HANDLING
// ===================================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===================================
// PERFORMANCE MONITORING
// ===================================
if (window.performance && performance.navigation.type === 1) {
    console.log('%cPage was reloaded', 'color: #FFD700');
} else {
    console.log('%cPage loaded successfully ✓', 'color: #00D26A');
}

// ===================================
// PARALLAX EFFECT ON SCROLL
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero::before');
    
    parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}, { passive: true });

// ===================================
// END OF SCRIPT
// ===================================
console.log('%c✓ All scripts loaded successfully', 'color: #00D26A; font-weight: bold;');