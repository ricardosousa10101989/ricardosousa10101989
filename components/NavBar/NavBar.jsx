import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from 'components/Image';
import Link from 'components/Link';
import NavBarItem from 'components/NavBar/Item/Item';

import useClickOutside from 'hooks/useClickOutside';
import useFirstRender from 'hooks/useFirstRender';

import addPassiveEventListener from 'utils/addPassiveEventListener';

import seo from 'data/seo.yml';

import svgLogoHeader from './assets/logo-header.svg';

const NavBar = () => {
  const firstRender = useFirstRender();

  useEffect(() => {
    if (firstRender) {
      setTimeout(() => {
        document.body.classList.add('transitions-enabled');
      }, 100);
    }
  }, [ firstRender ]);

  useEffect(() => {
    const handler = () => {
      const { scrollY } = window;

      if (scrollY) {
        document.body.classList.add('scrolled');
      }
      else {
        document.body.classList.remove('scrolled');
      }
    };

    // When refreshing an already scrolled page, the logo will appear floating
    // in the middle of the page. To fix this, we immediately apply the scrolled
    // class.
    handler();

    // Highlight the top nav as scrolling occurs
    return addPassiveEventListener(window, 'scroll', handler);
  }, []);

  const containerRef = useRef();

  useEffect(() => {
    const handler = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;

        containerRef.current.style.setProperty('--container-width', `${clientWidth}px`);
      }
    };

    handler();

    return addPassiveEventListener(window, 'resize', handler);
  }, []);

  const [ mobile, setMobile ] = useState(false);

  const onClickOutside = useCallback(() => {
    setMobile(false);
  }, []);

  const clickOutside = useClickOutside(onClickOutside);

  return (
    <nav
      className={ classnames('navbar navbar-expand-md fixed-top', {
        'navbar--expanded': mobile,
      }) }
      ref={ clickOutside }
    >
      <div
        className="container"
        ref={ containerRef }
      >
        <Link
          aria-label="To top"
          className="navbar-brand"
          to="#page-top"
        >
          <Image
            alt={ seo.site_title }
            className="navbar-logo"
            src={ svgLogoHeader }
          />
        </Link>

        <button
          aria-label="Toggle navigation"
          className="navbar-toggler"
          onClick={ () => {
            setMobile(!mobile);
          } }
          type="button"
        >
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </button>

        <div className="navbar-collapse">
          <div className="navbar-nav navbar-right">
            <NavBarItem
              id="about"
              onClick={ () => setMobile(false) }
            >
              Acerca
            </NavBarItem>
            <NavBarItem
              id="services"
              onClick={ () => setMobile(false) }
            >
              Serviços
            </NavBarItem>
            <NavBarItem
              id="portfolio"
              onClick={ () => setMobile(false) }
            >
              Portfolio
            </NavBarItem>
            <NavBarItem
              id="contact"
              onClick={ () => setMobile(false) }
            >
              Contactos
            </NavBarItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
