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
});
