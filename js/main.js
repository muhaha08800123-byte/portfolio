/**
 * MAIN JAVASCRIPT - Portfolio Sukhalawan Srirattanam
 * Features: Dark/Light Mode, Mobile Navigation, Portfolio Filter, Lightbox Modal, Interactive Alerts
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initPortfolioFilter();
  initLightbox();
  initContactForm();
});

/* ==========================================================================
   THEME TOGGLE (Dark / Light Mode) with LocalStorage Sync
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Retrieve saved theme or default to 'dark' for sleek cyber/modern look
  const savedTheme = localStorage.getItem('portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio_theme', newTheme);
      showToast(`เปลี่ยนเป็นโหมด ${newTheme === 'dark' ? 'มืด (Dark Mode)' : 'สว่าง (Light Mode)'} เรียบร้อย`);
    });
  }

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fa-solid fa-moon';
        if (themeToggleBtn) themeToggleBtn.title = 'สลับเป็นโหมดมืด';
      } else {
        themeIcon.className = 'fa-solid fa-sun';
        if (themeToggleBtn) themeToggleBtn.title = 'สลับเป็นโหมดสว่าง';
      }
    }
  }
}

/* ==========================================================================
   MOBILE NAVIGATION MENU TOGGLE
   ========================================================================== */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburgerBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }
}

/* ==========================================================================
   PORTFOLIO FILTERING
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (filterBtns.length === 0 || projectCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   IMAGE LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (!lightboxModal || !lightboxImg) return;

  const previewButtons = document.querySelectorAll('[data-lightbox-trigger]');

  previewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      if (!card) return;

      const imgEl = card.querySelector('.project-thumb img');
      const titleEl = card.querySelector('.project-title');
      const descEl = card.querySelector('.project-desc');

      if (imgEl) lightboxImg.src = imgEl.src;
      if (titleEl && lightboxTitle) lightboxTitle.textContent = titleEl.textContent;
      if (descEl && lightboxDesc) lightboxDesc.textContent = descEl.textContent;

      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeModal);
  }

  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   CONTACT FORM & CLIPBOARD COPY
   ========================================================================== */
function initContactForm() {
  // Copy Email Functionality
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'puicpui1855@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('คัดลอกอีเมลเรียบร้อยแล้ว: ' + email);
      }).catch(() => {
        showToast('อีเมล: ' + email);
      });
    });
  }

  // Contact Form Submit Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('senderName');
      const name = nameInput ? nameInput.value : 'คุณ';
      
      showToast(`ขอบคุณ ${name}! ข้อความของคุณถูกส่งเรียบร้อยแล้ว`);
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

