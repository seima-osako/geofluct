(function () {
  "use strict";

  // ── Mobile menu toggle ──────────────────────────────────
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      var icon = menuToggle.querySelector("i");
      if (icon) {
        icon.className = mobileMenu.classList.contains("hidden")
          ? "fa-solid fa-bars text-xl"
          : "fa-solid fa-xmark text-xl";
      }
    });

    // Close when a menu link is clicked
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        var icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars text-xl";
      });
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden");
        var icon = menuToggle.querySelector("i");
        if (icon) icon.className = "fa-solid fa-bars text-xl";
      }
    });
  }

  // ── Nav frosted glass on scroll ─────────────────────────
  var topnav = document.getElementById("topnav");
  window.addEventListener("scroll", function () {
    if (topnav) {
      if (window.scrollY > 40) {
        topnav.classList.add("scrolled");
      } else {
        topnav.classList.remove("scrolled");
      }
    }
  });

  // ── Smooth scroll for anchor links ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var navHeight = topnav ? topnav.offsetHeight : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - navHeight - 8;
        window.scrollTo({ top: top, behavior: "smooth" });
      }
    });
  });

  // ── Active nav link via IntersectionObserver ────────────
  var sections = document.querySelectorAll("section[data-section]");
  var navLinks = document.querySelectorAll(".nav-link");

  if (sections.length > 0 && "IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var sectionName = entry.target.getAttribute("data-section");
            navLinks.forEach(function (link) {
              link.classList.remove("active");
              if (link.getAttribute("data-nav-section") === sectionName) {
                link.classList.add("active");
              }
            });
          }
        });
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // ── Scroll-reveal animation via IntersectionObserver ────
  if ("IntersectionObserver" in window) {
    var animObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            animObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    function observeAnimatables() {
      document.querySelectorAll(".scroll-animate:not([data-observed])").forEach(function (el) {
        el.setAttribute("data-observed", "1");
        animObserver.observe(el);
      });
    }

    // Observe existing elements
    observeAnimatables();

    // Watch for dynamically added elements (from index.js populate calls)
    var mutationObserver = new MutationObserver(observeAnimatables);
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }

  // ── Typewriter animation ────────────────────────────────
  var typewriterEl = document.getElementById("typewriter-text");
  var phrases = [
    "Geospatial Data Scientist",
    "GeoAI Engineer",
    "Environmental Analyst",
  ];
  var phraseIndex = 0;
  var charIndex   = 0;
  var isDeleting  = false;

  function typeWrite() {
    if (!typewriterEl) return;
    var current = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    var delay = isDeleting ? 45 : 95;

    if (!isDeleting && charIndex === current.length) {
      delay = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeWrite, delay);
  }

  // Start typewriter after hero entrance animation finishes
  if (typewriterEl) {
    setTimeout(typeWrite, 1000);
  }

})();
