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

  // Lightbox doesn't support responsive images by default, so let's give it a
  // little help.
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', e => {
      // We disable lightbox in mobile
      if (window.innerWidth < 768) {
        item.removeAttribute('data-lightbox');
        e.preventDefault();
        return;
      }

      const targetW = window.innerWidth * window.devicePixelRatio;
      const img = item.querySelector('.portfolio__img');

      // Set a default value to at least always load something.
      item.setAttribute('href', img.dataset.src);
      item.setAttribute('data-lightbox', 'portfolio');

      // Find the optimal image size to load; it assumes srcset is listed in
      // descending order by width size.
      img.dataset.srcset
        .split(',')
        .map(opt => opt.trim().split(' '))
        .forEach(([ path, size ]) => {
          if (parseInt(size, 10) > targetW) {
            item.setAttribute('href', path);
          }
        });
    });
  });
})();
