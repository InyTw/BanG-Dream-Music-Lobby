    // Navbar 動畫效果
    const navbar = document.getElementById('navbar');
    // 進入時淡入動畫
    navbar.style.opacity = '0';
    navbar.style.transition = 'opacity 0.8s cubic-bezier(.4,2,.6,1)';
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => { navbar.style.opacity = '1'; }, 100);
    });

    // 滾動時陰影與背景透明度變化
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.background = 'rgba(58,141,222,0.92)';
        navbar.style.boxShadow = '0 4px 24px #3a8dde88';
      } else {
        navbar.style.background = '';
        navbar.style.boxShadow = '';
      }
    });

    // 響應式 navbar toggle
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    function handleResize() {
      if (window.innerWidth <= 700) {
        navbarToggle.style.display = '';
        navbarLinks.style.display = 'none';
      } else {
        navbarToggle.style.display = 'none';
        navbarLinks.style.display = '';
        navbarLinks.style.position = '';
        navbarLinks.style.background = '';
        navbarLinks.style.boxShadow = '';
        navbarLinks.style.borderRadius = '';
        navbarLinks.style.padding = '';
        navbarLinks.style.flexDirection = '';
        navbarLinks.style.top = '';
        navbarLinks.style.right = '';
        navbarLinks.style.zIndex = '';
        navbarLinks.style.transition = '';
      }
    }
    navbarToggle.addEventListener('click', () => {
      if (navbarLinks.style.display === 'none') {
        navbarLinks.style.display = 'flex';
        navbarLinks.style.flexDirection = 'column';
        navbarLinks.style.position = 'absolute';
        navbarLinks.style.top = '64px';
        navbarLinks.style.right = '10px';
        navbarLinks.style.background = 'rgba(20,20,20,0.98)';
        navbarLinks.style.borderRadius = '14px';
        navbarLinks.style.boxShadow = '0 8px 32px #000b';
        navbarLinks.style.padding = '16px 0';
        navbarLinks.style.zIndex = '999';
        navbarLinks.style.transition = 'all 0.3s cubic-bezier(.4,2,.6,1)';
      } else {
        navbarLinks.style.display = 'none';
      }
    });
    window.addEventListener('resize', handleResize);
    window.addEventListener('DOMContentLoaded', handleResize);

// Navbar 動畫效果
    const navbar = document.getElementById('navbar');
    navbar.style.opacity = '0';
    navbar.style.transition = 'opacity 0.8s cubic-bezier(.4,2,.6,1)';
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => { navbar.style.opacity = '1'; }, 100);
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        navbar.style.background = 'rgba(58,141,222,0.92)';
        navbar.style.boxShadow = '0 4px 24px #3a8dde88';
      } else {
        navbar.style.background = '';
        navbar.style.boxShadow = '';
      }
    });