import { useEffect, useRef } from 'react';

import Button from 'components/Button/Button';
import Image from 'components/Image';
import Section from 'components/Section/Section';

import usePageData from 'hooks/usePageData';

import addPassiveEventListener from 'utils/addPassiveEventListener';

import seo from 'data/seo.yml';

const Header = () => {
  const pageData = usePageData();

  const headerRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;

      if (headerRef.current && scrollY > headerRef.current.clientHeight / 2) {
        document.body.classList.add('header-gone');
      }
      else {
        document.body.classList.remove('header-gone');
      }
    };

    // When refreshing an already scrolled page, the logo will appear floating
    // in the middle of the page. To fix this, we immediately apply the scrolled
    // class.
    handleScroll();

    // Highlight the top nav as scrolling occurs
    return addPassiveEventListener(window, 'scroll', handleScroll);
  }, []);

  return (
    <Section
      As="header"
      className="header"
      id="hero"
      ref={ headerRef }
    >
      <div className="container">
        <Image
          alt={ seo.site_title }
          className="header__bg"
          src={ pageData?.hero_image }
          sizes="100vw"
        />

        <div className="header__intro-text">
          <div className="header__intro-lead-in">
            { pageData?.hero_text }
          </div>

          <Button
            className="btn-lg header__button"
            to="#contact"
          >
            Peça orçamento
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default Header;
