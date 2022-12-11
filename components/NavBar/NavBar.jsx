import { useCallback, useEffect } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from 'components/Image';
import Link from 'components/Link';
import NavBarItem from 'components/NavBar/Item/Item';

import useClickOutside from 'hooks/useClickOutside';
import useDrawerMenu from 'hooks/useDrawerMenu';
import useRouter from 'hooks/useRouter';

import addPassiveEventListener from 'utils/addPassiveEventListener';

import general from 'content/general.yml';

import svgLogoHeader from './assets/logo-header.svg';

const NavBar = () => {
  const { pathname } = useRouter();

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

  const [ drawerMenu, setDrawerMenu ] = useDrawerMenu();

  const onClickOutside = useCallback(() => {
    setDrawerMenu(false);
  }, [ setDrawerMenu ]);

  const clickOutside = useClickOutside(onClickOutside);

  return (
    <nav
      className={ classnames('navbar navbar-expand-md fixed-top', {
        'navbar--expanded': drawerMenu,
      }) }
      ref={ clickOutside }
    >
      <div className="container">
        <Link
          aria-label="To top"
          className="navbar-brand"
          to={ pathname === '/' ? '#hero' : '/' }
        >
          <Image
            alt={ general.site_title }
            className="navbar-logo"
            src={ svgLogoHeader }
          />
        </Link>

        <button
          aria-label="Toggle navigation"
          className="navbar-toggler"
          onClick={ () => {
            setDrawerMenu(!drawerMenu);
          } }
          type="button"
        >
          <FontAwesomeIcon icon="fa-solid fa-bars" />
        </button>

        <div className="navbar-nav navbar-right">
          { pathname === '/' && (
            <>
              <NavBarItem id="services">
                Serviços
              </NavBarItem>
              <NavBarItem id="portfolio">
                Portfolio
              </NavBarItem>
              <NavBarItem id="about">
                Acerca
              </NavBarItem>
              <NavBarItem id="contact">
                Contacto
              </NavBarItem>
            </>
          ) }

          { pathname !== '/' && (
            <NavBarItem to="/">
              Página Principal
            </NavBarItem>
          ) }
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
