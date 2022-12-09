import About from 'components/About/About';
import Contact from 'components/Contact/Contact';
import Footer from 'components/Footer/Footer';
import Hero from 'components/Hero/Hero';
import NavBar from 'components/NavBar/NavBar';
import Portfolio from 'components/Portfolio/Portfolio';
import Services from 'components/Services/Services';

// eslint-disable-next-line arrow-body-style
const Homepage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  );
};

export default Homepage;
