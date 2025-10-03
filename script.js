document.getElementById('current-year').textContent = new Date().getFullYear();
        
// =====================================================================
// === ၁။ Logo ပုံ URL ထည့်သွင်းရန် နေရာ (32x32px အတွက် သင့်တော်သည်) ===
// =====================================================================
const WEBSITE_LOGO_URL = "images/IMG_20251003_134544.png"; 
        
// =====================================================================
// === ၂။ Hero Banner ပုံ URL များ ထည့်သွင်းရန် နေရာ (Ratio 6:5) ===
// ပုံ ၅ ပုံအထိ အောက်ပါ array တွင် ထည့်သွင်းနိုင်သည်
// =====================================================================
const HERO_BANNER_URLS = [
    "images/ai photo00.png", // ပုံ ၁ (သင်၏ Logo ပုံကို ယာယီအသုံးပြုထားသည်)
    "images/ai photo01.jpg", // ပုံ ၂ (Placeholder)
    "images/ai photo02.png", // ပုံ ၃ (Placeholder)
    "images/ai photo03.png", // ပုံ ၄ (Placeholder)
    "images/ai photo04.png" // ပုံ ၅ (Placeholder)
];
        
// UI ပေါ်ရှိ နေရာများတွင် ပုံများ ထည့်သွင်းခြင်း
document.getElementById('website-logo').src = WEBSITE_LOGO_URL;

// --- Live Counter Animation ---
function animateCounter(id, finalValue, duration = 2000) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let start = 0;
    const step = Math.ceil(finalValue / (duration / 16)); 
            
    const count = setInterval(() => {
        start += step;
        if (start > finalValue) {
            start = finalValue;
            clearInterval(count);
        }
        obj.textContent = start.toLocaleString();
    }, 16);
}

// --- Carousel Logic ---
let slideIndex = 1;

function initializeCarousel() {
    const carouselContainer = document.getElementById('image-carousel');
    const indicatorContainer = document.getElementById('carousel-indicators');

    HERO_BANNER_URLS.forEach((url, index) => {
        // Create image slide
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Ad Image ${index + 1}`;
        img.className = 'slide-image object-cover';
                
        // Add onerror fallback for placeholder images
        img.onerror = function() {
            const fallbackUrls = [
                "images/ai photo00.png",
                "images/ai photo01.jpg",
                "images/ai photo02.png",
                "images/ai photo03.png",
                "images/ai photo04.png"
            ];
            // Cycle through fallbacks or use a generic one if initial URL failed
            this.src = fallbackUrls[index % fallbackUrls.length]; 
            this.onerror = null; // Prevent endless loop if fallback fails
        };
                
        carouselContainer.appendChild(img);
                
        // Create indicator dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => currentSlide(index + 1);
        indicatorContainer.appendChild(dot);
    });
            
    showSlides(slideIndex);
            
    // Auto slide every 5 seconds
    setInterval(() => plusSlides(1), 5000);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide-image");
    let dots = document.getElementsByClassName("dot");
            
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
            
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}
        
// Next/previous controls (Accessible globally via window)
window.plusSlides = function(n) {
    showSlides(slideIndex += n);
}

// Indicator controls (Accessible globally via window)
window.currentSlide = function(n) {
    showSlides(slideIndex = n);
}

// --- Ripple Effect Implementation ---
function attachRippleEffect(button) {
    button.classList.add('ripple-button');
    button.addEventListener('click', function (e) {
        const rect = button.getBoundingClientRect();
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;

        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - rect.left - radius}px`;
        ripple.style.top = `${e.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(ripple);
    });
}

function attachRippleToAllButtons() {
    // Select all relevant buttons: <button> tags and <a> tags styled as buttons/CTAs
    document.querySelectorAll('button:not([onclick^="toggleFaq"]), a.inline-block[href], a.w-full, a.bg-blue-600').forEach(attachRippleEffect);
}

// --- Mobile Menu Auto-Close ---
function hideMobileMenu() {
    document.getElementById('mobile-menu').classList.add('hidden');
}

function setupMobileMenuAutoClose() {
    // Listener to open/close the menu
    document.getElementById('mobile-menu-button').addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Listener to close the menu when any link is clicked (mobile-nav-link class)
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', hideMobileMenu);
    });
}
        
// --- FAQ Toggle ---
window.toggleFaq = function(id) {
    const answer = document.getElementById(`answer-${id}`);
    const icon = document.getElementById(`icon-${id}`);
    const isHidden = answer.classList.contains('hidden');

    // Close all others
    // Note: Assuming there are only 2 FAQs, but checking 1-3 for robustness
    for (let i = 1; i <= 3; i++) { 
        const otherAnswer = document.getElementById(`answer-${i}`);
        const otherIcon = document.getElementById(`icon-${i}`);
        if (otherAnswer && otherIcon && i !== id) {
            otherAnswer.classList.add('hidden');
            otherIcon.classList.remove('rotate-45');
        }
    }

    // Toggle current one
    if (isHidden) {
        answer.classList.remove('hidden');
        icon.classList.add('rotate-45');
    } else {
        answer.classList.add('hidden');
        icon.classList.remove('rotate-45');
    }
}
        
document.addEventListener('DOMContentLoaded', () => {
    // Start counters when the page loads
    animateCounter('accounts-count', 128); 
    animateCounter('projects-count', 45);  

    // Initialize the image carousel
    initializeCarousel();

    // Attach ripple effect to all main buttons/CTAs
    attachRippleToAllButtons();

    // Set up mobile menu auto-close
    setupMobileMenuAutoClose();
});