import {
  useCallback, useEffect, useMemo, useState,
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

  const close = useCallback(() => setLightbox(null), [ setLightbox ]);

  const clickableContainer = useMemo(() => prepareClickableContainer(close), [ close ]);

  // Prevent scrolling the page in the background while lightbox is visible
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = 'hidden';

      setLast(lightbox);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [ lightbox ]);

  return firstRender && (
    <div
      className={ classnames('lightbox', {
        'lightbox--visible': lightbox,
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
        <img
          alt={ last?.title || 'hidden' }
          className="lightbox__img"
          sizes="100vw"
          src={ last?.src }
          srcSet={ last?.srcset }
        />

        <div className="lightbox__details">
          { last?.title }
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
