import $ from 'jquery';

(() => {
  const navbar = document.querySelector('.navbar');
  let scrollTimeout = null;

  // Highlight the top nav as scrolling occurs
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        const what = $(window).scrollTop() ? 'add' : 'remove';
        navbar.classList[what]('navbar--scrolled');
        document.body.classList[what]('scrolled');
        scrollTimeout = null;
      }, 150);
    }
  });
})();
