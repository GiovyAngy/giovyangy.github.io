// assets/js/i18n.js - VERSIONE CON GESTIONE DROPDOWN
(function() {
  'use strict';

  const CONFIG = {
    supported: ['en', 'it', 'de'],
    fallback: 'en',
    path: '/translations/', // Assicur sia corretta rispetto alla root del storageKey: 'agcodelang'
  };

  let currentLang = localStorage.getItem(CONFIG.storageKey) || detectBrowserLang();

  function detectBrowserLang() {
    const lang = (navigator.language || navigator.userLanguage || '').split('-')[0].toLowerCase();
    return CONFIG.supported.includes(lang) ? lang : CONFIG.fallback;
  }

  async function loadTranslations(lang) {
    try {
      const res = await fetch(`${CONFIG.path}${lang}.json`);
      if (!res.ok) throw new Error('Translation file missing');
      return await res.json();
    } catch (error) {
      console.warn(`[i18n] Failed to load ${lang}.json, falling back to ${CONFIG.fallback}`);
      return lang !== CONFIG.fallback ? loadTranslations(CONFIG.fallback) : {};
    }
  }

  function applyTranslations(dict) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const value = dict[key];
      if (!value) return;

      const type = el.dataset.i18nType || 'text';
      if (type === 'html') el.innerHTML = value;
      else if (type === 'placeholder') el.placeholder = value;
      else if (type === 'alt') el.alt = value;
      else el.textContent });
  }

  function updateActiveSelector(lang) {
    // Aggiorna i pulsanti nel dropdown
    document.querySelectorAll('.lang-btn.dropdown-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    // Aggiorna la visualizzazione nel pulsante principale del dropdown
    const currentLangDisplay = document.getElementById('current-lang-display');
    if (currentLangDisplay) {
        // Usa semplicemente il codice
        currentLangDisplay.textContent = lang.toUpperCase();
    }
  }

  function setupDropdownListeners() {
    const dropdownBtn = document.getElementById('lang-dropdown-btn');
    const dropdownMenu = document.getElementById('lang-dropdown-menu');

    if (!dropdownBtn || !dropdownMenu) {
        console.warn("[i18n] Dropdown elements (lang-dropdown-btn, lang-dropdown-menu) not found in the DOM.");
        return; // Esci se non trova gli elementi
    }

    // Aggiungi classe 'dropdown-option' ai pulsanti lingua per differenziarli visivamente
    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
        btn.classList.add('dropdown-option');
    });

    // Toggle menu on click
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Impedisce che il click si propaghi e chiuda immediatamente
        const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
        dropdownBtn.setAttribute('aria-expanded', !isExpanded);
        dropdownMenu.classList.toggle('show', !isExpanded);
    });

    // Chiudi menu se si clicca fuori
    document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownMenu.classList.remove('show');
        }
    });

    // Gestione click sui pulsanti lingua
    document.querySelectorAll('.lang-btn.dropdown-option').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const lang = e.currentTarget.dataset.lang;
        if (lang === currentLang) {
            // Chiudi comunque il menu se si clicca sulla lingua già attiva
            dropdownBtn.setAttribute('aria-expanded', 'false');
            dropdownMenu.classList.remove('show');
            return;
        }

        currentLang = lang;
        localStorage.setItem(CONFIG.storageKey, lang);

        const dict = await loadTranslations(lang);
        applyTranslations(dict);
        updateActiveSelector(lang);
        document.documentElement.lang = currentLang;

        // Chiudi il menu dopo aver selezionato
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.remove('show');
      });
    });
  }

  async function init() {
    const dict = await loadTranslations(currentLang);
    applyTranslations(dict);
    updateActiveSelector(currentLang);
    document.documentElement.lang = currentLang;
    setupDropdownListeners(); // Chiama la nuova funzione per il dropdown
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();