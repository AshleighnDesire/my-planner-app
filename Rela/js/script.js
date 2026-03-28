/**
 * Serenity Wellness Villa
 * Main JavaScript File
 */

// ===================================
// 1. SLIDESHOW FUNCTIONALITY
// ===================================

console.log('Slideshow script starting...');
    
    const slides = document.querySelectorAll('.slideshow-item');
    const dots = document.querySelectorAll('.control-dot');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
    
    console.log('Found slides:', slides.length);
    console.log('Found dots:', dots.length);
    
    let currentSlide = 0;
    let autoplayInterval;
    const slideDelay = 5000;

    function updateSlide(newIndex) {
      console.log('Updating to slide:', newIndex);
      
      // Add exiting class to current slide for smooth fade out
      slides[currentSlide].classList.add('is-exiting');
      
      // Wait a moment before removing active class
      setTimeout(() => {
        slides[currentSlide].classList.remove('is-active', 'is-exiting');
        dots[currentSlide].classList.remove('is-active');
      }, 100);
      
      // Update current slide index
      currentSlide = newIndex;
      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      
      // Add active class to new slide
      setTimeout(() => {
        slides[currentSlide].classList.add('is-active');
        dots[currentSlide].classList.add('is-active');
      }, 150);
      
      console.log('Now showing slide:', currentSlide);
    }

    function nextSlide() {
      updateSlide(currentSlide + 1);
    }

    function prevSlide() {
      updateSlide(currentSlide - 1);
    }

    function startAutoplay() {
      console.log('Starting autoplay...');
      autoplayInterval = setInterval(nextSlide, slideDelay);
    }

    function stopAutoplay() {
      console.log('Stopping autoplay...');
      clearInterval(autoplayInterval);
    }

    // Event listeners
    if (rightArrow) {
      rightArrow.addEventListener('click', () => {
        console.log('Right arrow clicked');
        stopAutoplay();
        nextSlide();
        startAutoplay();
      });
    }

    if (leftArrow) {
      leftArrow.addEventListener('click', () => {
        console.log('Left arrow clicked');
        stopAutoplay();
        prevSlide();
        startAutoplay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        console.log('Dot clicked:', index);
        stopAutoplay();
        updateSlide(index);
        startAutoplay();
      });
    });

    // Pause on hover
    document.querySelector('.slideshow').addEventListener('mouseenter', () => {
      console.log('Mouse entered - pausing');
      stopAutoplay();
    });
    
    document.querySelector('.slideshow').addEventListener('mouseleave', () => {
      console.log('Mouse left - resuming');
      startAutoplay();
    });

    // Start autoplay
    console.log('Initializing slideshow...');
    startAutoplay();
// ===================================
// 2. MOBILE NAVIGATION
// ===================================

class MobileNavigation {
    constructor() {
        this.toggleBtn = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        if (this.toggleBtn && this.navMenu) {
            this.addEventListeners();
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('is-open');
        this.toggleBtn.classList.toggle('is-active');
        
        // Update aria-expanded attribute
        const isExpanded = this.navMenu.classList.contains('is-open');
        this.toggleBtn.setAttribute('aria-expanded', isExpanded);
    }

    closeMenu() {
        this.navMenu.classList.remove('is-open');
        this.toggleBtn.classList.remove('is-active');
        this.toggleBtn.setAttribute('aria-expanded', 'false');
    }

    addEventListeners() {
        // Toggle menu on button click
        this.toggleBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('is-open')) {
                this.closeMenu();
            }
        });
    }
}

// ===================================
// 3. NAVIGATION SCROLL EFFECT
// ===================================

class NavigationScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 100;
        
        this.init();
    }

    init() {
        if (this.navbar) {
            this.addScrollListener();
        }
    }

    updateNavbar(scrollPosition) {
        if (scrollPosition > this.scrollThreshold) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.12)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    }

    addScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.pageYOffset;
                    this.updateNavbar(scrollPosition);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// ===================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.addClickListeners();
    }

    addClickListeners() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// 5. INTERSECTION OBSERVER (ANIMATIONS)
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.feature-card, .testimonial');
        
        if (elements.length > 0) {
            this.observeElements(elements);
        }
    }

    observeElements(elements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// ===================================
// 6. INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const slideshow = new Slideshow();
    const mobileNav = new MobileNavigation();
    const navScroll = new NavigationScrollEffect();
    const smoothScroll = new SmoothScroll();
    const scrollAnimations = new ScrollAnimations();
    
    console.log('✨ Serenity Wellness Villa website initialized successfully!');
});

// ===================================
// 5. GALLERY FILTER FUNCTIONALITY
// ===================================

class GalleryFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.galleryItems = document.querySelectorAll('.gallery-item');
        
        this.init();
    }

    init() {
        if (this.filterButtons.length > 0 && this.galleryItems.length > 0) {
            this.addEventListeners();
        }
    }

    filterGallery(category) {
        this.galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                item.classList.remove('hidden');
                // Add fade in animation
                item.style.animation = 'fadeIn 0.5s ease';
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
            }
        });
    }

    addEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter gallery
                const filterValue = button.getAttribute('data-filter');
                this.filterGallery(filterValue);
            });
        });
    }
}

// ===================================
// 6. CONTACT FORM HANDLING
// ===================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.addSubmitListener();
        }
    }

    addSubmitListener() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you within 24 hours.');
            
            // Reset form
            this.form.reset();
        });
    }
}

// ===================================
// 7. INTERSECTION OBSERVER (ANIMATIONS)
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        const elements = document.querySelectorAll(
            '.feature-card, .testimonial, .value-card, .team-member, ' +
            '.service-item, .room-card, .package-card, .amenity-item'
        );
        
        if (elements.length > 0) {
            this.observeElements(elements);
        }
    }

    observeElements(elements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// ===================================
// 8. INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const slideshow = new Slideshow();
    const mobileNav = new MobileNavigation();
    const navScroll = new NavigationScrollEffect();
    const smoothScroll = new SmoothScroll();
    const scrollAnimations = new ScrollAnimations();
    const galleryFilter = new GalleryFilter();
    const contactForm = new ContactForm();
    
    console.log('✨ Serenity Wellness Villa website initialized successfully!');
});/**
 * Serenity Wellness Villa
 * Main JavaScript File
 */

// ===================================
// 1. SLIDESHOW FUNCTIONALITY
// ===================================

class Slideshow {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.arrow-left');
        this.nextBtn = document.querySelector('.arrow-right');
        this.currentIndex = 0;
        this.totalSlides = this.slides.length;
        this.intervalId = null;
        this.autoPlayDelay = 5000;
        
        this.init();
    }

    init() {
        if (this.slides.length > 0 && this.dots.length > 0) {
            this.addEventListeners();
            this.startAutoPlay();
            this.handleVisibilityChange();
        }
    }

    showSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        // Update current index with proper wrapping
        this.currentIndex = (index + this.totalSlides) % this.totalSlides;
        
        // Add active class to new slide and dot
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }

    goToSlide(index) {
        this.showSlide(index);
    }

    startAutoPlay() {
        this.intervalId = setInterval(() => this.nextSlide(), this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }

    addEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });

        // Arrow navigation
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.prevSlide();
                this.restartAutoPlay();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.nextSlide();
                this.restartAutoPlay();
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.prevSlide();
                this.restartAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.restartAutoPlay();
            }
        });

        // Pause on hover
        this.slides.forEach(slide => {
            slide.addEventListener('mouseenter', () => this.stopAutoPlay());
            slide.addEventListener('mouseleave', () => this.startAutoPlay());
        });
    }

    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoPlay();
            } else {
                this.startAutoPlay();
            }
        });
    }
}

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Slideshow();
});

// ===================================
// 2. MOBILE NAVIGATION
// ===================================

class MobileNavigation {
    constructor() {
        this.toggleBtn = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.links = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        if (this.toggleBtn && this.navMenu) {
            this.addEventListeners();
        }
    }

    toggleMenu() {
        this.navMenu.classList.toggle('is-open');
        this.toggleBtn.classList.toggle('is-active');
        
        // Update aria-expanded attribute
        const isExpanded = this.navMenu.classList.contains('is-open');
        this.toggleBtn.setAttribute('aria-expanded', isExpanded);
    }

    closeMenu() {
        this.navMenu.classList.remove('is-open');
        this.toggleBtn.classList.remove('is-active');
        this.toggleBtn.setAttribute('aria-expanded', 'false');
    }

    addEventListeners() {
        // Toggle menu on button click
        this.toggleBtn.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.toggleBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('is-open')) {
                this.closeMenu();
            }
        });
    }
}

// ===================================
// 3. NAVIGATION SCROLL EFFECT
// ===================================

class NavigationScrollEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 100;
        
        this.init();
    }

    init() {
        if (this.navbar) {
            this.addScrollListener();
        }
    }

    updateNavbar(scrollPosition) {
        if (scrollPosition > this.scrollThreshold) {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            this.navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.12)';
        } else {
            this.navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    }

    addScrollListener() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollPosition = window.pageYOffset;
                    this.updateNavbar(scrollPosition);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
}

// ===================================
// 4. SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.addClickListeners();
    }

    addClickListeners() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') {
                    e.preventDefault();
                    return;
                }
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// 5. INTERSECTION OBSERVER (ANIMATIONS)
// ===================================

class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        const elements = document.querySelectorAll('.feature-card, .testimonial');
        
        if (elements.length > 0) {
            this.observeElements(elements);
        }
    }

    observeElements(elements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, this.observerOptions);

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }
}

// ===================================
// 6. INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const slideshow = new Slideshow();
    const mobileNav = new MobileNavigation();
    const navScroll = new NavigationScrollEffect();
    const smoothScroll = new SmoothScroll();
    const scrollAnimations = new ScrollAnimations();
    
    console.log('✨ Serenity Wellness Villa website initialized successfully!');
});


// ===================================
// 10. Booking Form Handling
// ===================================

const form = document.getElementById("bookingForm");
const messageBox = document.getElementById("formMessage");
const submitBtn = document.getElementById("submitBtn");
const bookingCard = document.querySelector(".booking-card");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const phone = formData.get("phone").trim();
  const checkin = formData.get("checkin");
  const checkout = formData.get("checkout");

  if (new Date(checkout) <= new Date(checkin)) {
    showMessage("⚠️ Check-out date must be after check-in date.", "error", true);
    return;
  }

  const confirmBooking = confirm(
    `Confirm your booking:\n\n` +
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n` +
    `Check-in: ${checkin}\nCheck-out: ${checkout}\n` +
    `Guests: ${formData.get("guests")}\nPackage: ${formData.get("package")}`
  );
  if (!confirmBooking) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Booking...";

  fetch("/process-booking", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (response.ok) {
      showMessage("✅ Your booking has been successfully submitted!", "success", false, true);
      form.reset();
    } else {
      throw new Error("Server error");
    }
  })
  .catch(error => {
    showMessage("❌ There was a problem submitting your booking. Please try again.", "error", true);
    console.error(error);
  })
  .finally(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = "Book Now";
  });
});

function showMessage(text, type, shake = false, glow = false) {
  messageBox.textContent = text;
  messageBox.className = "message " + type;
  messageBox.style.display = "block";

  // Reset fade
  messageBox.classList.remove("fade-out");

  // Shake effect
  if (shake) {
    bookingCard.classList.add("shake");
    setTimeout(() => bookingCard.classList.remove("shake"), 600);
  }

  // Glow effect
  if (glow) {
    bookingCard.classList.add("glow");
    setTimeout(() => bookingCard.classList.remove("glow"), 1600);
  }

  // Fade out after 4s
  setTimeout(() => {
    messageBox.classList.add("fade-out");
  }, 4000);

  // Hide completely after 5s
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 5000);
}

