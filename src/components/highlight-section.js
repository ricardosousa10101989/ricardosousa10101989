// Polyfill
import 'intersection-observer';

import safe from '../utils/safe';

safe(() => {
  const sections = new Map();
  const options = {
    threshold: [ ...Array(101).keys() ].map(x => x / 100),
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      sections.get(entry.target).threshold = entry.intersectionRatio;
    });

    let biggest = { threshold: 0 };
    sections.forEach(section => {
      if (biggest.threshold < 1 && section.threshold > biggest.threshold) {
        biggest = section;
      }
    });

    if (biggest.target && !biggest.target.classList.contains('main-section--active')) {
      const navLinks = document.querySelectorAll('.page-scroll');
      navLinks.forEach(link => {
        link.classList.remove('page-scroll--active');
      });

      sections.forEach(section => {
        if (section.target === biggest.target) {
          section.target.classList.add('main-section--active');

          if (section.target.id) {
            document.querySelectorAll(`.page-scroll[href="#${section.target.id}"]`).forEach(link => {
              link.classList.add('page-scroll--active');
            });
          }
        }
        else {
          section.target.classList.remove('main-section--active');
        }
      });
    }
  }, options);

  document.querySelectorAll('.main-section').forEach(section => {
    sections.set(section, {
      active: false,
      target: section,
      threshold: 0,
    });

    observer.observe(section);
  });
});
