import safe from '../utils/safe';

safe(() => {
  const navbar = document.querySelector('.navbar');
  const toggler = document.querySelector('.navbar-toggler');
  const navContent = document.getElementById('navbar__content');
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    // Closes the Responsive Menu on Menu Item Click
    link.addEventListener('click', () => {
      if (navContent.classList.contains('show')) {
        // We're sure to be scrolling down now, make sure the logo stays in
        // its corner and doesn't jump back and forth.
        navbar.classList.add('navbar--scrolled');
        document.body.classList.add('scrolled');

        toggler.click();
      }
    });
  });

  // Keep track of when the mobile menu is showing
  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.attributeName === 'aria-expanded')) {
      if (toggler.getAttribute('aria-expanded') === 'true') {
        navbar.classList.add('navbar--expanded');
      }
      else {
        navbar.classList.remove('navbar--expanded');
      }
    }
  });

  observer.observe(toggler, { attributes: true });
});
