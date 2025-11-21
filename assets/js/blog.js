// Popup/lightbox for blog image grid
function openPopup(img) {
    var popup = document.getElementById('imgPopup');
    var popupImg = document.getElementById('popupImg');
    popupImg.src = img.src;
    popup.classList.add('active');
}

function closePopup(e) {
    var popup = document.getElementById('imgPopup');
    if (e.target.classList.contains('img-popup') || e.target.classList.contains('popup-close')) {
        popup.classList.remove('active');
        document.getElementById('popupImg').src = '';
    }
}
// Blog slideshow functionality
class BlogSlideshow {
    constructor(container, index) {
        this.container = container;
        this.index = index;
        this.currentSlide = 1;
        this.slides = container.querySelectorAll('.slide');
        this.dots = container.querySelectorAll('.dot');
        this.init();
    }
    
    init() {
        this.showSlides(1);
        // Add click handlers to buttons
        const prevBtn = this.container.querySelector('.prev');
        const nextBtn = this.container.querySelector('.next');
        
        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.changeSlide(-1);
        });
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.changeSlide(1);
        });
        
        // Add click handlers to dots
        this.dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSlides(idx + 1);
            });
        });
    }
    
    changeSlide(n) {
        this.showSlides(this.currentSlide += n);
    }
    
    showSlides(n) {
        if (n > this.slides.length) {
            this.currentSlide = 1;
        }
        if (n < 1) {
            this.currentSlide = this.slides.length;
        }
        
        this.slides.forEach(slide => slide.classList.remove('fade'));
        this.dots.forEach(dot => dot.classList.remove('active'));
        
        if (this.slides[this.currentSlide - 1]) {
            this.slides[this.currentSlide - 1].classList.add('fade');
        }
        if (this.dots[this.currentSlide - 1]) {
            this.dots[this.currentSlide - 1].classList.add('active');
        }
    }
}

// Initialize all slideshows when page loads
document.addEventListener('DOMContentLoaded', function() {
    const slideshows = document.querySelectorAll('.slideshow-container');
    slideshows.forEach((container, idx) => {
        new BlogSlideshow(container, idx);
    });
});
