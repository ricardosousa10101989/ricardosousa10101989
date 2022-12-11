import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'tiny-slider/dist/tiny-slider.css';

import Image from 'components/Image';
import Section from 'components/Section/Section';
import SectionHeading from 'components/Section/Heading/Heading';

import useLightbox from 'hooks/useLightbox';
import usePageData from 'hooks/usePageData';

import addPassiveEventListener from 'utils/addPassiveEventListener';

const getMode = () => (typeof window !== 'undefined' && window.innerWidth >= 768 ? 'dk' : 'mb');

const Portfolio = () => {
  const pageData = usePageData();

  const [ container, setContainer ] = useState(null);
  const [ , setLightbox ] = useLightbox();
  const [ mode, setMode ] = useState(getMode());
  const [ tns, setTns ] = useState(null);
  const slider = useRef();

  useEffect(() => {
    (async () => {
      const imported = (await import('tiny-slider/src/tiny-slider')).tns;
      setTns(() => imported);
    })();
  });

  useEffect(() => {
    const handler = () => {
      const newMode = getMode();
      if (newMode !== mode) {
        setMode(newMode);
      }
    };

    return addPassiveEventListener(window, 'resize', handler);
  }, [ mode ]);

  const previousDisplayIndex = useRef();

  const highlightActive = useCallback(info => {
    if (!container) {
      return;
    }

    const active = info.slideItems.item(info.index);
    const previous = container.querySelector('.portfolio__item--active');

    if (active !== previous) {
      if (previous) {
        previous.classList.remove('portfolio__item--active');
      }

      if (active) {
        // When looping back to the first node, there would be a jumpy
        // transition artifact. We avoid this by disabling the transition
        // momentarily, to allow tns to loop the nodes without visually
        // alerting the user.
        if (previousDisplayIndex.current === info.displayIndex) {
          active.classList.add('portfolio__item--looped');

          setTimeout(() => {
            active.classList.remove('portfolio__item--looped');
          }, 100);
        }

        active.classList.add('portfolio__item--active');

        // Try to preload the very next picture not yet visible.
        const indexChange = mode === 'dk' ? 2 : 1;
        const preloadItem = idx => {
          const item = info.slideItems.item(idx);
          if (item) {
            const img = item.querySelector('.tns-lazy-img');
            if (img && !img.hasAttribute('src')) {
              img.setAttribute('src', img.dataset.src);
              if (img.dataset.srcset) {
                img.setAttribute('srcset', img.dataset.srcset);
              }
            }
          }
        };

        if (info.index === info.indexCached || info.index > info.indexCached) {
          preloadItem(info.index + indexChange);
        }

        if (info.index === info.indexCached || info.index < info.indexCached) {
          preloadItem(info.index - indexChange);
        }
      }
    }

    previousDisplayIndex.current = info.displayIndex;
  }, [ container, mode ]);

  useEffect(() => {
    if (container && tns) {
      slider.current = tns({
        center: true,
        container,
        gutter: 0,
        items: mode === 'dk' ? 2 : 1,
        lazyload: true,
        mouseDrag: false,
        nav: false,
        nextButton: '.portfolio__next',
        prevButton: '.portfolio__previous',

        // This option triggers a Lighthouse warning "Does not use passive
        // listeners to improve scrolling performance", but that's likely an
        // error by Lighthouse. The handlers for this option are supposed to stop
        // scrolling, so they can't be passive. Lighthouse is supposed to filter
        // out handlers that call e.preventDefault(), but that's clearly not
        // happening.
        preventScrollOnTouch: 'auto',
      });

      slider.current.events.on('indexChanged', info => {
        highlightActive(info);
      });

      // Initial active slider needs to be highlighted.
      highlightActive(slider.current.getInfo());
    }
  }, [ container, highlightActive, mode, tns ]);

  useEffect(() => {
    if (container && mode === 'dk') {
      const handler = () => {
        const info = slider.current?.getInfo();
        if (info) {
          const { index } = info;
          const item = info.slideItems.item(index);
          setLightbox({
            src: item.querySelector('img').src,
            srcset: item.querySelector('img').srcset,
            title: item.dataset.title,
          });
        }
      };

      container.addEventListener('click', handler);

      return () => {
        container.removeEventListener('click', handler);
      };
    }

    return undefined;
  }, [ container, mode, setLightbox ]);

  return (
    <Section
      id="portfolio"
      className="main-section portfolio__wrapper"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionHeading>{ pageData?.portfolio_title }</SectionHeading>
          </div>
        </div>
      </div>

      <div className="portfolio__outer-container">
        <button
          aria-label="Previous photo"
          className="portfolio__controller portfolio__previous"
          type="button"
        >
          <div className="portfolio__controller-icon">
            <FontAwesomeIcon icon="fa-solid fa-angle-left" />
          </div>
        </button>
        <button
          aria-label="Next photo"
          className="portfolio__controller portfolio__next"
          type="button"
        >
          <div className="portfolio__controller-icon">
            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
          </div>
        </button>

        <div
          className="portfolio__container"
          ref={ el => {
            if (el && el !== container) {
              setContainer(el);
            }
          } }
        >
          { pageData?.portfolio?.map(item => (
            <button
              key={ item.image }
              aria-label="Expand portfolio photo"
              className="portfolio__item"
              data-image={ item.image }
              data-title={ item.title }
              type="button"
            >
              <Image
                alt={ item.title }
                className="portfolio__img"
                src={ item.image }
                sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </button>
          )) }
        </div>
      </div>
    </Section>
  );
};

export default Portfolio;
