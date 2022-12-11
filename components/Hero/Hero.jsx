import Button from 'components/Button/Button';
import Image from 'components/Image';
import Section from 'components/Section/Section';

import usePageData from 'hooks/usePageData';

import general from 'content/general.yml';

const Header = () => {
  const pageData = usePageData();

  return (
    <Section
      As="header"
      className="hero"
      id="hero"
    >
      <Image
        alt={ general.site_title }
        className="hero__bg"
        priority
        quality={ 10 }
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
          Pedir orçamento
        </Button>
      </div>
    </Section>
  );
};

export default Header;
