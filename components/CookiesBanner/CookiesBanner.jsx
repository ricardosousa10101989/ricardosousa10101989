import { useEffect, useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from 'components/Button/Button';
import Link from 'components/Link';

import useConsent from 'hooks/useConsent';
import useCookiesBanner from 'hooks/useCookiesBanner';
import useFirstRender from 'hooks/useFirstRender';

import cookiesBannerYml from 'content/cookies_banner.yml';

const cookieOptions = [ 'analytics', 'marketing' ];

const CookiesBanner = () => {
  const firstRender = useFirstRender();
  const [ consent, setConsent ] = useConsent();
  const [ cookiesBanner, setCookiesBanner ] = useCookiesBanner();

  const [ activeOptions, setActiveOptions ] = useState(cookieOptions.reduce((acc, option) => ({
    ...acc,
    [option]: consent?.[option] || false,
  }), {}));

  useEffect(() => {
    if (!cookiesBanner && !consent) {
      setCookiesBanner('banner');
    }
  }, [ consent, cookiesBanner, setCookiesBanner ]);

  useEffect(() => {
    if (firstRender && cookiesBanner) {
      // Don't bother with refs, Button and Link don't support it and not worth the trouble
      // rewriting those with forwardRef and testing everything just for this.
      const btn = document.querySelector('.cookies-banner__btn--accept');
      if (btn) {
        btn.focus();
      }
    }
  }, [ cookiesBanner, firstRender ]);

  return firstRender && cookiesBanner && (
    <div
      className={ classnames('cookies-banner', `cookies-banner--${cookiesBanner}`) }
    >
      <div className="container">
        <div className="cookies-banner__content">
          <div className="cookies-banner__info">
            <FontAwesomeIcon icon="fa-solid fa-info" />
          </div>
          { cookiesBannerYml.message }
        </div>

        <div className="cookies-banner__links">
          <Link to="/condicoes-de-utilizacao">Condições de Utilização</Link>
          <Link to="/politica-de-privacidade">Política de Privacidade</Link>
          <Link to="/cookies">Política de Cookies</Link>
        </div>

        { cookiesBanner === 'options' && (
          <div className="cookies-banner__options">
            { cookieOptions.map(option => (
              <div
                key={ option }
                className="cookies-banner__option"
              >
                <input
                  checked={ activeOptions[option] }
                  className="form-check-input custom-control-input"
                  id={ `cookies-banner__option--${option}` }
                  label={ cookiesBannerYml[option] || option }
                  onChange={ event => setActiveOptions({
                    ...activeOptions,
                    [option]: event.target.checked,
                  }) }
                  type="checkbox"
                  value={ activeOptions[option] }
                />
                <label
                  className="form-check-label custom-control-label contact__checkbox-label"
                  htmlFor={ `cookies-banner__option--${option}` }
                >
                  { cookiesBannerYml[option] }
                </label>
              </div>
            )) }
          </div>
        ) }

        { cookiesBanner === 'banner' && (
          <Button
            className="cookies-banner__btn cookies-banner__btn--more"
            onClick={ () => {
              setCookiesBanner('options');
            } }
            variant="clear"
          >
            { cookiesBannerYml.more }
          </Button>
        ) }

        <Button
          className="cookies-banner__btn cookies-banner__btn--accept"
          onClick={ () => {
            setConsent(cookieOptions.reduce((acc, option) => ({
              ...acc,
              [option]: cookiesBanner === 'banner' || activeOptions[option],
            }), {}));
            setCookiesBanner(null);
          } }
        >
          { cookiesBanner === 'options' ? cookiesBannerYml.save : cookiesBannerYml.accept }
        </Button>
      </div>
    </div>
  );
};

export default CookiesBanner;
