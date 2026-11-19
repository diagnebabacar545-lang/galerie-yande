document.addEventListener('DOMContentLoaded', () => {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            // Animer le bouton burger si nécessaire
            menuToggle.classList.toggle('active');
        });
    }

    // Effet scroll sur le header
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled');
            header.classList.remove('scrolled'); // Force remove
            if (window.scrollY <= 50) {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Initial check
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});
