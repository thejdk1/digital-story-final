/* =====================================================================
   script.js — small helpers only. The site works without it.
     1. Mobile menu (hamburger)
     2. Infographic lightbox ("View full size")
     3. Subtle fade-in on scroll
     4. Auto-fill the footer year
   ===================================================================== */

// Tell the CSS that JavaScript is running (enables the mobile menu + fade-ins)
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. Mobile menu ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    function setMenu(open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    }
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    // Close with Escape and return focus to the button
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    // Close if the window is resized up to desktop width
    window.matchMedia('(min-width: 761px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- 2. Lightbox ---------- */
  // Any link with data-lightbox opens the <dialog id="lightbox"> instead of a new tab.
  // If the browser doesn't support <dialog>, the link just opens the image normally.
  var dialog = document.getElementById('lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    var dialogImg = dialog.querySelector('img');
    var lastTrigger = null;

    document.querySelectorAll('[data-lightbox]').forEach(function (trigger) {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        lastTrigger = trigger;
        var src = trigger.getAttribute('href') || trigger.dataset.src;
        if (src) dialogImg.src = src;
        dialog.showModal();
        dialog.querySelector('.lightbox__close').focus();
      });
    });

    dialog.querySelector('.lightbox__close').addEventListener('click', function () {
      dialog.close();
    });
    // Click on the dark backdrop closes it
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* ---------- 3. Fade-in on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 4. Footer year ---------- */
  // Fills any <span data-year> with the current year. Delete this if you'd
  // rather type the year by hand.
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
