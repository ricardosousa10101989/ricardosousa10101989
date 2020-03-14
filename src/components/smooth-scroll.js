// Polyfill
import smoothscroll from 'smoothscroll-polyfill';

import safe from '../utils/safe';

// Need to call this for the polyfill to kick in.
smoothscroll.polyfill();

safe(() => {
  const scrolls = document.querySelectorAll('.page-scroll');

  scrolls.forEach(scroll => {
    scroll.addEventListener('click', event => {
      const section = document.querySelector(scroll.getAttribute('href'));
      if (section) {
        event.preventDefault();

        // Smooth scrolling feature
        section.scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  });
});
