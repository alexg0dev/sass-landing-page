// Small progressive enhancements. The page works without this file:
// the menu is always visible and the form is still usable.

(function () {
  'use strict';

  // Mobile menu
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav__toggle');

  function setOpen(open) {
    nav.classList.toggle('nav--open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close the menu after picking a link, or when Escape is pressed.
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('nav--open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Demo booking form: check the required fields and show a message.
  var form = document.getElementById('booking-form');
  var message = document.getElementById('form-message');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstInvalid = form.querySelector(':invalid');
    if (firstInvalid) {
      message.textContent = 'Please fill in your name and phone number.';
      firstInvalid.focus();
      return;
    }
    var name = form.elements.name.value.trim().split(' ')[0];
    message.textContent = 'Thanks ' + name + '. On a real site we would now be in touch to arrange a drop-off time.';
    form.reset();
  });
})();
