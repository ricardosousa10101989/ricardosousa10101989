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
      className="hero"
      id="hero"
    >
      <Image
        alt={ seo.site_title }
        className="hero__bg"
        priority
        src={ pageData?.hero_image }
        sizes="100vw"
      />

      <div className="container">
        <div className="hero__intro-text">
          <div className="hero__intro-lead-in">
            { pageData?.hero_text }
          </div>
        </div>

        <Button
          className="btn-lg hero__button"
          to="#contact"
        >
          Peça orçamento
        </Button>
      </div>
    </Section>
  );
};

export default Header;
