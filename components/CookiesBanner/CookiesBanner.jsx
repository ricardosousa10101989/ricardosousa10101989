import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button/Button';

import useConsent from 'hooks/useConsent';
import useFirstRender from 'hooks/useFirstRender';

import seo from 'data/seo.yml';

const cookieOptions = [ 'analytics' ];

const CookiesBanner = () => {
  const firstRender = useFirstRender();
  const [ consent, setConsent ] = useConsent();
  const [ visible, setVisible ] = useState();

  useEffect(() => {
    if (!visible && !consent) {
      setVisible(true);
    }
  }, [ consent, visible, setVisible ]);

  return firstRender && visible && (
    <div className="cookies-banner">
      <div className="container">
        <div className="cookies-banner__content">
          <div className="cookies-banner__info">
            <FontAwesomeIcon icon="fa-solid fa-info" />
          </div>
          { seo.gdpr_message }
        </div>

        <Button
          className="cookies-banner__btn cookies-banner__btn--refuse"
          onClick={ () => {
            setConsent(cookieOptions.reduce((acc, option) => ({
              ...acc,
              [option]: false,
            }), {}));
            setVisible(false);
          } }
          variant="clear"
        >
          { seo.gdpr_refuse }
        </Button>

        <Button
          className="cookies-banner__btn cookies-banner__btn--accept"
          onClick={ () => {
            setConsent(cookieOptions.reduce((acc, option) => ({
              ...acc,
              [option]: true,
            }), {}));
            setVisible(false);
          } }
        >
          { seo.gdpr_accept }
        </Button>
      </div>
    </div>
  );
};

export default CookiesBanner;
