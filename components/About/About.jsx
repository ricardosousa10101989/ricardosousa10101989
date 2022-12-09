import Section from 'components/Section/Section';
import SectionContent from 'components/Section/Content/Content';
import SectionHeading from 'components/Section/Heading/Heading';

import usePageData from 'hooks/usePageData';

const About = () => {
  const pageData = usePageData();

  return (
    <Section id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <SectionHeading>{ pageData?.about_title }</SectionHeading>
            <SectionContent>
              { pageData?.__content }
            </SectionContent>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
