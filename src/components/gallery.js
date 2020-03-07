import { tns } from 'tiny-slider/src/tiny-slider';

(() => {
  tns({
    // autoplay: true,
    autoplayButton: false,
    container: '.portfolio__container',
    gutter: 10,
    items: 1,
    lazyload: true,
    mouseDrag: true,
    nav: false,
    nextButton: '.portfolio__next',
    prevButton: '.portfolio__previous',
  });

  lightbox.option({
    showImageNumberLabel: false,
  });
})();
