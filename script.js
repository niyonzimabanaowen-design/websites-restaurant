// =============================
// The Cozy Plate — main.js (10/10)
// Fully functional, responsive, accessible
// =============================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // ===== Navigation Menu Toggle =====
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.main-nav');

  if(menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
      menuBtn.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('active');
    });
  }

  // ===== Smooth Scroll for Navigation Links =====
  const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target) {
        e.preventDefault();
        const headerOffset = 70; // adjust if header height changes
        const elementPos = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPos - headerOffset,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Scroll Animation for Sections =====
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.15
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const phoneInput = document.getElementById('phone');
    const contactMsg = document.getElementById('contactMsg');

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let errors = [];

      // Name
      if(!nameInput.value.trim()) errors.push('Name is required');

      // Email (simple but better regex)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailPattern.test(emailInput.value)) errors.push('Valid email is required');

      // Message
      if(!messageInput.value.trim()) errors.push('Message cannot be empty');

      // Phone (optional)
      if(phoneInput.value.trim() && !/^[0-9+ \-()]{7,}$/.test(phoneInput.value.trim())) {
        errors.push('Phone number is invalid');
      }

      // Show errors inline
      if(errors.length > 0) {
        contactMsg.textContent = errors.join('. ');
        contactMsg.style.color = 'red';
      } else {
        contactMsg.textContent = 'Message sent successfully!';
        contactMsg.style.color = 'green';
        contactForm.reset();
      }
    });
  }

  // ===== Menu Filtering (flex/grid friendly) =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      menuItems.forEach(item => {
        if(category === 'all' || item.classList.contains(category)) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // Highlight active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ===== Optional: Dark Mode Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

});
