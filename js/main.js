// ===== Language Switching =====
(function () {
  const STORAGE_KEY = 'northlab-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'nl';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    // Update all elements with data-nl / data-en
    document.querySelectorAll('[data-nl][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Update placeholders
    document.querySelectorAll('[data-nl-placeholder][data-en-placeholder]').forEach(function (el) {
      el.placeholder = el.getAttribute('data-' + lang + '-placeholder');
    });

    // Update select options
    document.querySelectorAll('select option[data-nl][data-en]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
    });

    // Update lang toggle buttons
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var spans = btn.querySelectorAll('span');
      if (lang === 'nl') {
        spans[0].className = 'lang-active';
        spans[1].className = 'lang-inactive';
      } else {
        spans[0].className = 'lang-inactive';
        spans[1].className = 'lang-active';
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  // Init on page load
  document.addEventListener('DOMContentLoaded', function () {
    applyLanguage(currentLang);

    // Bind all toggle buttons
    document.querySelectorAll('#langToggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(currentLang === 'nl' ? 'en' : 'nl');
      });
    });
  });
})();

// ===== Navbar Scroll Effect =====
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  var scrollThreshold = 50;

  function onScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ===== Mobile Navigation =====
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
  });

  // Close menu on link click
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      links.classList.remove('open');
    });
  });
})();

// ===== Legal Page Language Switching =====
(function () {
  function showLegalLang(lang) {
    var blocks = document.querySelectorAll('.legal-lang-block');
    if (!blocks.length) return;
    blocks.forEach(function (block) {
      block.style.display = block.getAttribute('data-lang') === lang ? 'block' : 'none';
    });
  }

  var lang = localStorage.getItem('northlab-lang') || 'nl';
  showLegalLang(lang);

  var observer = new MutationObserver(function () {
    showLegalLang(document.documentElement.lang || 'nl');
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();

// ===== Scroll Reveal =====
(function () {
  var reveals = document.querySelectorAll('.scroll-reveal');
  if (!reveals.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
