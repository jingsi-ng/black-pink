document.addEventListener('DOMContentLoaded', () => {
    
    const handleScrollAnimation = () => {
        const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
    
    const cards = document.querySelectorAll('.index-card, .index-card2, .member-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', (e) => {
            e.currentTarget.style.transform = 'translateY(0)';
        });
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    const closeBtn = document.querySelector('.video-close');

    if (!modal) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            if (videoId) {
                videoFrame.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
                modal.classList.add('active');
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        videoFrame.src = '';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});