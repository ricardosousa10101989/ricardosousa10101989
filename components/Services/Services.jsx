import Section from 'components/Section/Section';
import SectionHeading from 'components/Section/Heading/Heading';
import ServicesItem from 'components/Services/Item/Item';

import usePageData from 'hooks/usePageData';

const Services = () => {
  const pageData = usePageData();

  return (
    <Section
      className="services"
      id="services"
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionHeading>{ pageData?.services_title }</SectionHeading>
          </div>
        </div>
        <div className="row services__wrapper">
          { pageData?.services?.map(service => (
            <ServicesItem
              key={ service.title }
              { ...service }
            />
          )) }
        </div>
      </div>
    </Section>
  );
};

export default Services;
