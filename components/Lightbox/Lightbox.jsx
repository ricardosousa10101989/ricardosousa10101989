import {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useFirstRender from 'hooks/useFirstRender';
import useLightbox from 'hooks/useLightbox';

import prepareClickableContainer from 'utils/prepareClickableContainer';

const Lightbox = () => {
  const firstRender = useFirstRender();

  const [ lightbox, setLightbox ] = useLightbox();
  const [ last, setLast ] = useState(null);
  const [ loaded, setLoaded ] = useState(false);

  const close = useCallback(() => setLightbox(null), [ setLightbox ]);
  const timer = useRef();

  const clickableContainer = useMemo(() => prepareClickableContainer(close), [ close ]);

  // Prevent scrolling the page in the background while lightbox is visible
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }

    if (lightbox) {
      document.body.style.overflow = 'hidden';

      if (last !== lightbox) {
        setLast(lightbox);
        setLoaded(false);
      }
    }
    else {
      timer.current = setTimeout(() => {
        setLast(null);
        setLoaded(false);
      }, 400);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [ last, lightbox ]);

  return firstRender && (
    <div
      className={ classnames('lightbox', {
        'lightbox--visible': lightbox,
        'lightbox--loaded': loaded,
      }) }
    >
      <div
        aria-label="Close"
        className="lightbox__overlay"
        { ...clickableContainer }
        tabIndex={ -1 }
      />

      <button
        aria-label="Close"
        className="lightbox__close"
        onClick={ close }
        type="button"
      >
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </button>

      <div className="lightbox__content">
        <div className="lightbox__img-wrapper">
          { !!lightbox && !loaded && (
            <FontAwesomeIcon
              className="lightbox__img lightbox__img--spinner"
              icon="fa-solid fa-spinner"
            />
          ) }

          <img
            alt={ last?.title || 'hidden' }
            className={ classnames('lightbox__img', 'lightbox__img--main', {
              'lightbox__img--loaded': loaded,
            }) }
            onLoad={ () => setLoaded(true) }
            sizes="100vw"
            src={ last?.src }
            srcSet={ last?.srcset }
          />
        </div>

        <div className="lightbox__details">
          { last?.title }
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
