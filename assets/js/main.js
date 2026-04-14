// assets/js/main.js - VERSIONE DEFINITIVA
(function() {
  'use strict';

  // --- UTILS ---
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);

  // --- INIT ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupSmoothScroll();
    setupMobileMenu();
    setupNavDropdown();
    setupMobileAutoClose();
    setupProductGallery();
    setupFormValidation();
    setupIntersectionObserver();
    setDynamicYear();
    console.log('AG CodeDev site loaded. Contact: hello@agcodedev.com');
  }

  // --- FUNZIONI ---

  // Smooth scroll alle ancore
  function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      e.preventDefault();
      const hash = target.getAttribute('href');
      if (hash === '#' || !hash.startsWith('#')) return;

      const targetEl = document.querySelector(hash);
      if (!targetEl) return;

      // Compensazione per header sticky
      const header = document.querySelector('.header');
      if (!header) return;
      
      const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - header.offsetHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    });
  }

  // Menu mobile
  function setupMobileMenu() {
    const toggle = $('.mobile-toggle');
    const nav = $('.nav');
    if (!toggle || !nav) {
      console.warn("Elementi per il menu mobile (.mobile-toggle, .nav) non trovati.");
      return;
    }

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('mobile-active');
      document.body.classList.toggle('no-scroll', nav.classList.contains('mobile-active'));
    });

    // Chiudi menu su resize desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        toggle.classList.remove('active');
        nav.classList.remove('mobile-active');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  // Validazione modulo contatti
  function setupFormValidation() {
    const form = $('form[action*="formspree"]');
    if (!form) {
      console.warn("Formspree form non trovato.");
      return;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const isValid = validateFormData(formData);

      if (isValid) {
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' }
        })
        .then(response => response.ok ? showFormSuccess() : showFormError())
        .catch(() => showFormError())
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
      } else {
        showFormError(true);
      }
    });
  }

  function validateFormData(data) {
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');
    const service = data.get('service');

    if (!name || name.trim().length < 2) return false;
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return false;
    if (!message || message.trim().length < 10) return false;
    if (!service || service === "") return false;

    return true;
  }

  function showFormSuccess() {
    alert('Thank you! Your message has been sent. I will respond within 24 hours.');
    $('form[action*="formspree"]').reset();
  }

  function showFormError(isClientSide = false) {
    const msg = isClientSide
      ? 'Please fill in all fields correctly (min 10 characters for message, select a service).'
      : 'Failed to send message. Please try again or contact me directly.';
    alert(msg);
  }

  // Animazioni scroll (observer)
  function setupIntersectionObserver() {
    if (!window.IntersectionObserver) {
      console.info("Intersection Observer non supportato. Animazioni disabilitate.");
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    $$('.service-card, .product-card, .testimonial, .contact-form').forEach(el => {
      el.classList.add('animate-init');
      observer.observe(el);
    });
  }

  // Placeholder analytics
  function setupAnalyticsPlaceholder() {
    // if (typeof plausible !== 'undefined') { ... }
  }

  // Anno dinamico nel footer
  function setDynamicYear() {
    const yearSpan = $('#year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }

  // Chiusura automatica menu mobile al click su link
  function setupMobileAutoClose() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.mobile-toggle');
    if (!nav || !toggle) return;

    nav.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      // Chiudi menu hamburger
      nav.classList.remove('mobile-active');
      toggle.classList.remove('active');
      document.body.classList.remove('no-scroll');

      // Chiudi eventuali dropdown "Services" aperti
      document.querySelectorAll('.nav-dropdown.active').forEach(d => d.classList.remove('active'));
    });
  }

  // Product Gallery Lightbox
  function setupProductGallery() {
    const trigger = document.querySelector('.gallery-trigger');
    const lightbox = document.getElementById('product-lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const mainImg = document.getElementById('lightbox-main');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const currentSpan = document.getElementById('lightbox-current');
    const totalSpan = document.getElementById('lightbox-total');
    
    if (!trigger || !lightbox) return;
    
    let currentIndex = 0;
    const images = Array.from(thumbs).map(t => ({
      src: t.dataset.src,
      alt: t.dataset.alt
    }));
    
    if (totalSpan) totalSpan.textContent = images.length;
    
    function openLightbox() {
      lightbox.hidden = false;
      document.body.classList.add('no-scroll');
      if (closeBtn) closeBtn.focus();
    }
    
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove('no-scroll');
      trigger.focus();
    }
    
    function updateImage(index) {
      if (!images[index]) return;
      currentIndex = index;
      if (mainImg) {
        mainImg.src = images[index].src;
        mainImg.alt = images[index].alt;
      }
      if (currentSpan) currentSpan.textContent = index + 1;
      
      thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
    }
    
    // Open
    if (trigger) trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox();
    });
    
    // Close
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (lightbox) lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!lightbox || lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        updateImage((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        updateImage((currentIndex + 1) % images.length);
      }
    });
    
    // Thumbnails
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => updateImage(index));
    });
    
    // Navigation arrows
    if (prevBtn) prevBtn.addEventListener('click', () => {
      updateImage((currentIndex - 1 + images.length) % images.length);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      updateImage((currentIndex + 1) % images.length);
    });
    
    // Prevent scroll on touch devices when lightbox is open
    if (lightbox) lightbox.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: false });
  }

  // Nav Dropdown Toggle (Mobile + Desktop)
  function setupNavDropdown() {
    const triggers = document.querySelectorAll('.nav-dropdown-trigger');
    
    triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const dropdown = trigger.parentElement;
        
        // Solo su mobile: toggle accordion, previeni navigazione
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.toggle('active');
          return;
        }
        // Su desktop: l'hover CSS gestisce l'apertura, il click va al link
      });
    });

    // Chiudi dropdown se si clicca fuori (solo mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-dropdown')) {
          document.querySelectorAll('.nav-dropdown.active')
            .forEach(d => d.classList.remove('active'));
        }
      }
    });
  }

})(); // <-- FINE IIFE: TUTTO IL CODICE È ORA DENTRO QUESTA FUNZIONE