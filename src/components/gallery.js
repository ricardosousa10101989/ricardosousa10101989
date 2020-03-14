import { tns } from 'tiny-slider/src/tiny-slider';

import safe from '../utils/safe';

safe(() => {
  const initLightbox = mode => {
    const items = document.querySelectorAll('.portfolio__item');

    const lightboxHandler = mode === 'dk'
      ? e => {
        // Don't follow the anchor.
        e.preventDefault();

        items.forEach(item => {
          const targetW = window.innerWidth * window.devicePixelRatio;
          const img = item.querySelector('.portfolio__img');

          // Set a default value to at least always load something. This will also
          // be used on ultra wide viewports that exceed the size of the largest
          // processed image.
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
      }
      : e => {
        // Don't follow the anchor.
        e.preventDefault();

        items.forEach(item => {
          item.removeAttribute('data-lightbox');
        });
        e.preventDefault();
      };

    items.forEach(el => {
      el.addEventListener('click', lightboxHandler);
    });
  };

  const slider = {
    instance: null,
    mode: null,
    timer: null,
  };

  const onResize = () => {
    const mode = window.innerWidth >= 768 ? 'dk' : 'mb';
    if (slider.mode === mode) {
      return;
    }

    slider.mode = mode;

    if (slider.instance) {
      slider.instance.destroy();
    }

    slider.instance = tns({
      autoplay: true,
      autoplayButtonOutput: false,
      autoplayHoverPause: true,
      center: true,
      container: '.portfolio__container',
      gutter: 0,
      items: mode === 'dk' ? 2 : 1,
      lazyload: true,
      mouseDrag: false,
      nav: false,
      nextButton: '.portfolio__next',
      prevButton: '.portfolio__previous',
      preventScrollOnTouch: 'auto',
    });

    if (mode === 'dk') {
      let previousDisplayIndex;

      const highlightActive = info => {
        const active = info.slideItems.item(info.index);
        const previous = document.querySelector('.portfolio__item--active');

        if (active !== previous) {
          if (previous) {
            previous.classList.remove('portfolio__item--active');
          }

          if (active) {
            // When looping back to the first node, there would be a jumpy
            // transition artifact. We avoid this by disabling the transition
            // momentarily, to allow tns to loop the nodes without visually
            // alerting the user.
            if (previousDisplayIndex === info.displayIndex) {
              active.classList.add('portfolio__item--looped');

              setTimeout(() => {
                active.classList.remove('portfolio__item--looped');
              }, 100);
            }

            active.classList.add('portfolio__item--active');
          }
        }

        previousDisplayIndex = info.displayIndex;
      };

      slider.instance.events.on('indexChanged', info => {
        // Don't break slider if this breaks for some reason.
        safe(() => {
          highlightActive(info);
        });
      });

      // Initial active slider needs to be highlighted.
      highlightActive(slider.instance.getInfo());
    }

    // Our Lightbox helper needs to run every time tns is rebuilt, as it
    // creates new nodes that need new handlers.
    // Lightbox doesn't support responsive images by default, so let's give it a
    // little help.
    initLightbox(mode);
  };

  onResize();
  window.addEventListener('resize', () => {
    if (!slider.timer) {
      slider.timer = setTimeout(() => {
        onResize();
        slider.timer = null;
      });
    }
  });

  lightbox.option({
    showImageNumberLabel: false,
  });
});
