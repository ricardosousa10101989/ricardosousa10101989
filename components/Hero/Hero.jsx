import Button from 'components/Button/Button';
import Image from 'components/Image';
import Section from 'components/Section/Section';

import usePageData from 'hooks/usePageData';

import seo from 'data/seo.yml';

const Header = () => {
  const pageData = usePageData();

  return (
    <Section
      As="header"
      className="header"
      id="hero"
    >
      <Image
        alt={ seo.site_title }
        className="header__bg"
        priority
        src={ pageData?.hero_image }
        sizes="100vw"
      />

      <div className="container">
        <div className="header__intro-text">
          <div className="header__intro-lead-in">
            { pageData?.hero_text }
          </div>
        </div>

        <Button
          className="btn-lg header__button"
          to="#contact"
        >
          Peça orçamento
        </Button>
      </div>
    </Section>
  );
};

export default Header;
