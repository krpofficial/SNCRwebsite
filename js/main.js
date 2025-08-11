// Smooth scroll to form
function scrollToForm() {
    const form = document.getElementById('hero-form');
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Video player functionality
function playVideo() {
    const container = document.getElementById('video-container');
    // Replace with actual video embed when you have the video URL
    container.innerHTML = `
        <iframe 
            width="100%" 
            height="400" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
}

function playProcessVideo() {
    const container = document.getElementById('process-video-container');
    // Replace with actual video embed when you have the video URL
    container.innerHTML = `
        <iframe 
            width="100%" 
            height="450" 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
        </iframe>
    `;
}

// Review carousel
let currentReview = 0;
const reviews = document.querySelectorAll('.review-card');
const dots = document.querySelectorAll('.dot');

function showReview(index) {
    reviews.forEach(review => review.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    reviews[index].classList.add('active');
    dots[index].classList.add('active');
    currentReview = index;
}

// Auto-rotate reviews
setInterval(() => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
}, 5000);

// Form handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send to your backend
            console.log('Form submitted:', data);
            
            // For demo purposes, show success message
            showSuccessMessage(form);
            
            // Track conversion (add your tracking code here)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'event_category': 'Lead',
                    'event_label': 'Landing Page Form'
                });
            }
            
            // Reset form
            form.reset();
        });
    });
    
    // Add input formatting for phone numbers
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    });
    
    // Sticky header shadow on scroll
    const header = document.querySelector('.fixed-header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Mobile menu toggle (if you add a mobile menu later)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.toggle('active');
        });
    }
});

// Success message function
function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div style="background: #10b981; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
            <h3 style="margin-bottom: 10px;">Thank You!</h3>
            <p>We've received your information and will contact you within 24 hours to schedule your free consultation.</p>
        </div>
    `;
    
    form.appendChild(message);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// Add urgency timer (optional)
function addUrgencyTimer() {
    const urgencyBox = document.querySelector('.urgency-box');
    if (!urgencyBox) return;
    
    // Set end date for the offer (adjust as needed)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7); // 7 days from now
    
    function updateTimer() {
        const now = new Date();
        const timeLeft = endDate - now;
        
        if (timeLeft <= 0) {
            urgencyBox.innerHTML = '<div class="urgency-item">Offer has ended</div>';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        
        const timerHTML = `
            <div class="urgency-item">
                <strong>Special Ends In:</strong> ${days} days, ${hours} hours, ${minutes} minutes
            </div>
        `;
        
        const existingContent = urgencyBox.querySelector('.urgency-item').innerHTML;
        if (existingContent.includes('Free MRI review')) {
            urgencyBox.innerHTML = `
                <div class="urgency-item">
                    <strong>Special This Month:</strong> Free MRI review with consultation ($500 value)
                </div>
                ${timerHTML}
            `;
        }
    }
    
    // Update timer every minute
    updateTimer();
    setInterval(updateTimer, 60000);
}

// Initialize urgency timer if needed
// addUrgencyTimer();

// Track scroll depth for analytics
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage > maxScroll) {
        maxScroll = scrollPercentage;
        
        // Track milestones
        if (maxScroll > 25 && maxScroll <= 26) {
            console.log('User scrolled 25%');
            // Add tracking code here
        } else if (maxScroll > 50 && maxScroll <= 51) {
            console.log('User scrolled 50%');
            // Add tracking code here
        } else if (maxScroll > 75 && maxScroll <= 76) {
            console.log('User scrolled 75%');
            // Add tracking code here
        } else if (maxScroll > 95) {
            console.log('User scrolled to bottom');
            // Add tracking code here
        }
    }
});

// Exit intent popup (optional - uncomment to use)
/*
let exitIntentShown = false;
document.addEventListener('mouseout', (e) => {
    if (!exitIntentShown && e.clientY <= 0 && e.relatedTarget == null) {
        exitIntentShown = true;
        // Show exit intent popup
        showExitPopup();
    }
});

function showExitPopup() {
    // Create and show popup offering special discount
    console.log('Show exit intent popup');
}
*/