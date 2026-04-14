// ============================================================
//  AG CodeDev — Web Components
//  Percorso: ./assets/js/components.js
//
//  Uso in ogni pagina HTML:
//    <site-header></site-header>
//    <site-footer></site-footer>
//    <script src="../assets/js/components.js" defer></script>


(function () {


  function getRoot() {
    const depth = window.location.pathname
      .split("/")
      .filter(Boolean).length - 1;          // -1 perché l'ultimo segmento è il file
    return depth > 0 ? "../".repeat(depth) : "";
  }

  // ----------------------------------------------------------
  //  <site-header>
  // ----------------------------------------------------------
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const root = getRoot();
      this.setAttribute('data-component', 'header');
      this.innerHTML = `
  <header class="header">
    <div class="container header-inner">

      <a href="/" class="logo">
        <span class="logo-icon"><img src="/img/logo_full.png " alt="AG CodeDev Logo" /></span>

      </a>

      <nav class="nav">
        <div class="nav-dropdown">
          <a href="${root}services/index.html" class="nav-dropdown-trigger" data-i18n="nav-services"
            data-i18n-type="html">Services <span class="dropdown-arrow">▼</span></a>
          <div class="nav-dropdown-menu">
            <a href="${root}services/index.html#ai-integrations" data-i18n="nav_ai" data-i18n-type="html">AI Integrations</a>
            <a href="${root}services/index.html#custom-development" data-i18n="nav_custom" data-i18n-type="html">Custom
              Development</a>
            <a href="${root}services/index.html#site-optimization" data-i18n="nav_opt" data-i18n-type="html">Site
              Optimization</a>
            <a href="${root}services/index.html#wordpress-plugins" data-i18n="nav_wp" data-i18n-type="html">WordPress
              Plugins</a>
          </div>
        </div>
        <div class="nav-dropdown">
          <a href="${root}#products" class="nav-dropdown-trigger" data-i18n="nav-products" data-i18n-type="html">Products<span class="dropdown-arrow">▼</span></a>
          <div class="nav-dropdown-menu">
            <a href="${root}products/plugin_health_check.html" data-i18n="phc_title"  data-i18n-type="html">Plugin Health Check</a>
            <a href="${root}products/fatturapdf_wp.html" data-i18n="fpdf_title" data-i18n-type="html">FatturaPDF WP</a>
            <a href="${root}products/e-commerce_n8n.html" data-i18n="wfec-title" data-i18n-type="html">WooCommerce Automation n8n</a>
          </div>
        </div>
        <a href="${root}#tech-stack" data-i18n="nav-technologies" data-i18n-type="html">Technologies & Tools</a>
        <a href="${root}about_us/index.html" data-i18n="nav-about" data-i18n-type="html">About Us</a>
        <a href="${root}#contact" data-i18n="nav-contact" data-i18n-type="html">Contact</a>

      </nav>

      <!-- Language Selector Dropdown -->
      <div class="dropdown">
        <!-- Pulsante principale del dropdown -->
        <button class="dropdown-btn" aria-haspopup="true" aria-expanded="false" id="lang-dropdown-btn">
          <span id="current-lang-display">EN</span> <!-- Mostra la lingua attuale -->
          <span class="dropdown-arrow">▼</span>
        </button>
        <!-- Menu nascosto del dropdown -->
        <div class="dropdown-menu" id="lang-dropdown-menu">
          <button class="lang-btn" data-lang="en" aria-label="English">EN</button>
          <button class="lang-btn" data-lang="it" aria-label="Italiano">IT</button>
          <button class="lang-btn" data-lang="de" aria-label="Deutsch">DE</button>
        </div>
      </div>

      <a href="${root}#products" class="btn btn-primary" data-i18n="cta-header" data-i18n-type="html">View Products</a menu
        toggle -->
      <button class="mobile-toggle" aria-label="Toggle menu">☰</button>
    </div>
  </header>
        `;
    }
  }

  // ----------------------------------------------------------
  //  <site-footer>
  // ----------------------------------------------------------
  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const root = getRoot();
      this.innerHTML = `
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a href="${root}" class="logo">
          <span class="logo-icon"><img src="${root}img/logo_full.png " alt="AG CodeDev Logo" /></span>
        </a>
        <p data-i18n="footer-tagline" data-i18n-type="html">Professional digital products & development services. Built
          to perform.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4 data-i18n="ft-products" data-i18n-type="html">Products</h4>
          <a href="${root}products/e-commerce_n8n.html" data-i18n="ft-products-link3" data-i18n-type="html">WooCommerce n8n</a>
          <a href="${root}products/fatturapdf_wp.html" data-i18n="ft-products-link2" data-i18n-type="html">FatturaPDF WP</a>
          <a href="${root}products/plugin_health_check.html" data-i18n="ft-products-link1" data-i18n-type="html">Plugin Health Check</a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="ft-services" data-i18n-type="html">Services</h4>
          <a href="${root}services/index.html#ai-integrations" data-i18n="title_ai_integration" data-i18n-type="html">AI Integrations</a>
          <a href="${root}services/index.html#custom-development" data-i18n="title_custom_dev" data-i18n-type="html">Custom Development</a>
          <a href="${root}services/index.html#wordpress-plugins" data-i18n="title_wp_plugin" data-i18n-type="html">WordPress Plugins</a>
          <a href="${root}services/index.html#site-optimization" data-i18n="title_site_opt" data-i18n-type="html">SEO Audit</a>
        </div>
        <div class="footer-col">
          <h4 data-i18n="ft-company" data-i18n-type="html">Company</h4>
          <a href="${root}about_us/index.html" data-i18n="ft-company-link1" data-i18n-type="html">About Us</a>
          <a href="${root}#contact" data-i18n="ft-contact" data-i18n-type="html">Contact</a>
        </div>
         <div class="footer-col">
          <h4 data-i18n="ft-legal" data-i18n-type="html">Legal</h4>
          <a href="${root}about_us/privacy.html" data-i18n="ft-privacy" data-i18n-type="html">Privacy Policy</a>
          <a href="${root}about_us/terms.html" data-i18n="ft-terms" data-i18n-type="html">Terms of Service</a>
          <!-- <a href="${root}refund.html" data-i18n="ft-refund" data-i18n-type="html">Refund Policy</a>-->
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>&copy; <span id="year"></span> AG CodeDev. All rights reserved.</p>
        <div class="footer-badges">
          <span data-i18n="badge-ssl" data-i18n-type="html">🔒 SSL Secured</span>
          <span data-i18n="badge-payhip" data-i18n-type="html">💳 Payhip Powered</span>
          <span data-i18n="badge-languages" data-i18n-type="html">🌍 EN/IT/DE</span>
        </div>
      </div>
    </div>
  </footer>`;

      // Anno dinamico — aggiornato subito dopo il render
      this.querySelectorAll(".footer-year").forEach(el => {
        el.textContent = new Date().getFullYear();
      });
    }
  }

  // ----------------------------------------------------------
  //  Registrazione
  // ----------------------------------------------------------
  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);

})();