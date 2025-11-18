// Blog slideshow functionality
let slideIndex = {};

function initSlideshows() {
    const slideshows = document.querySelectorAll('.slideshow-container');
    slideshows.forEach((container, idx) => {
        slideIndex[idx] = 1;
        showSlides(1, idx);
    });
}

function changeSlide(n, containerIdx = 0) {
    showSlides(slideIndex[containerIdx] += n, containerIdx);
}

function currentSlide(n, containerIdx = 0) {
    showSlides(slideIndex[containerIdx] = n, containerIdx);
}

function showSlides(n, containerIdx = 0) {
    const slideshows = document.querySelectorAll('.slideshow-container');
    const container = slideshows[containerIdx];
    
    if (!container) return;
    
    const slides = container.querySelectorAll('.slide');
    const dots = container.querySelectorAll('.dot');
    
    if (n > slides.length) {
        slideIndex[containerIdx] = 1;
    }
    if (n < 1) {
        slideIndex[containerIdx] = slides.length;
    }
    
    slides.forEach(slide => slide.classList.remove('fade'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex[containerIdx] - 1]) {
        slides[slideIndex[containerIdx] - 1].classList.add('fade');
    }
    if (dots[slideIndex[containerIdx] - 1]) {
        dots[slideIndex[containerIdx] - 1].classList.add('active');
    }
}

// Initialize slideshows when page loads
document.addEventListener('DOMContentLoaded', initSlideshows);
