const carouselImages = [
    {
        gradient: 'linear-gradient(135deg, #000000 0%, #ff1493 50%, #000000 100%)',
        title: 'BLACKPINK IN YOUR AREA',
        subtitle: 'World Tour 2025'
    },
    {
        gradient: 'linear-gradient(135deg, #ff1493 0%, #ff69b4 50%, #c71585 100%)',
        title: 'PINK VENOM ERA',
        subtitle: 'Breaking Records Worldwide'
    },
    {
        gradient: 'linear-gradient(135deg, #c71585 0%, #000000 50%, #ff1493 100%)',
        title: 'BORN PINK ALBUM',
        subtitle: 'Now Available Everywhere'
    },
    {
        gradient: 'linear-gradient(135deg, #ff69b4 0%, #000000 50%, #ff1493 100%)',
        title: 'BLACKPINK THE MOVIE',
        subtitle: 'Experience Their Journey'
    },
    {
        gradient: 'linear-gradient(135deg, #000000 0%, #c71585 50%, #ff69b4 100%)',
        title: 'COACHELLA 2023',
        subtitle: 'Historic Performance'
    }
];

let currentSlide = 0;
const totalSlides = carouselImages.length;
let autoPlayInterval = null;
let isTransitioning = false;

document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    startAutoPlay();
});

function initializeCarousel() {
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!track || !dotsContainer) return; 

    for (var i = 0; i < totalSlides; i++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.background = carouselImages[i].gradient;
        
        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';
        slideContent.innerHTML = `<h2>${carouselImages[i].title}</h2><p>${carouselImages[i].subtitle}</p>`;
        
        slide.appendChild(slideContent);
        track.appendChild(slide);
        
        const dot = document.createElement('span');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');

        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
    
    updateCarousel();
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => previousSlide());
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => nextSlide());
    }
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track) return;
    
    const translateValue = -(currentSlide * 100);
    track.style.transform = `translateX(${translateValue}%)`;
    
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
    }
}

function nextSlide() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentSlide = (currentSlide + 1) % totalSlides;
    
    updateCarousel();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
    
    resetAutoPlay();
}

function previousSlide() {
    if (isTransitioning) return;
    
    isTransitioning = true;
    currentSlide --;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    
    updateCarousel();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
    
    resetAutoPlay();
}

function goToSlide(index) {
    if (isTransitioning || index === currentSlide) return;
    
    isTransitioning = true;
    currentSlide = index;
    updateCarousel();
    
    setTimeout(() => {
        isTransitioning = false;
    }, 500);
    
    resetAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(() => nextSlide(), 5000); 
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

document.addEventListener('DOMContentLoaded', () => {
    const carouselSection = document.querySelector('.carousel-section');
    
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', () => stopAutoPlay());
        carouselSection.addEventListener('mouseleave', () => startAutoPlay());
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        previousSlide();
    } else if (event.key === 'ArrowRight') {
        nextSlide();
    }
});
