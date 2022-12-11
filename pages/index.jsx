import About from 'components/About/About';
import Contact from 'components/Contact/Contact';
import Hero from 'components/Hero/Hero';
import Portfolio from 'components/Portfolio/Portfolio';
import Services from 'components/Services/Services';

// eslint-disable-next-line arrow-body-style
const Homepage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const fs = await import('fs');
  const yamlFront = await import('yaml-front-matter');
  const contents = await fs.promises.readFile(`${process.cwd()}/content/homepage.md`);
  const pageData = yamlFront.loadFront(contents);

  return {
    props: {
      ...params,
      pageData,
    },
  };
};

export default Homepage;
