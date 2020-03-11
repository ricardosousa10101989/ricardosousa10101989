(() => {
  const navbar = document.querySelector('.navbar');
  let scrollTimeout = null;

  const handleScroll = () => {
    const what = jQuery(window).scrollTop() ? 'add' : 'remove';
    navbar.classList[what]('navbar--scrolled');
    document.body.classList[what]('scrolled');
    scrollTimeout = null;
  };

  // Highlight the top nav as scrolling occurs
  window.addEventListener('scroll', () => {
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
})();
