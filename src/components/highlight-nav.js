import addPassiveEventListener from '../utils/addPassiveEventListener';
import safe from '../utils/safe';

safe(() => {
  const navbar = document.querySelector('.navbar');
  const header = document.querySelector('.header');
  let scrollTimeout = null;

  const handleScroll = () => {
    const scrollTop = jQuery(window).scrollTop();

    // If more than half the header is gone, the transitions speed up, to
    // avoid the logo staying visible over the rest of the content.
    if (scrollTop > header.clientHeight / 2) {
      document.body.classList.add('header-gone');
    }
    else {
      document.body.classList.remove('header-gone');
    }

    if (scrollTop) {
      navbar.classList.add('navbar--scrolled');
      document.body.classList.add('scrolled');
    }
    else {
      navbar.classList.remove('navbar--scrolled');
      document.body.classList.remove('scrolled');
    }

    scrollTimeout = null;
  };

  // Highlight the top nav as scrolling occurs
  addPassiveEventListener(window, 'scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(handleScroll, 150);
    }
  });

  // When refreshing an already scrolled page, the logo will appear floating
  // in the middle of the page. To fix this, we immediately apply the scrolled
  // class.
  handleScroll();

  setTimeout(() => {
    document.body.classList.add('transitions-enabled');
  }, 100);
});
