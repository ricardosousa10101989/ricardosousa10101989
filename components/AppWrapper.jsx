import { useEffect, useMemo } from 'react';

import Head from 'next/head';

import CookiesBanner from 'components/CookiesBanner/CookiesBanner';
import Footer from 'components/Footer/Footer';
import Lightbox from 'components/Lightbox/Lightbox';
import Metadata from 'components/Metadata';
import NavBar from 'components/NavBar/NavBar';
import TrackingFPixel from 'components/Tracking/FPixel';
import TrackingGTag from 'components/Tracking/GTag';

import useRouter from 'hooks/useRouter';

// eslint-disable-next-line arrow-body-style
const AppWrapper = ({ children }) => {
  const { pathname } = useRouter();

  const bodyClass = useMemo(() => {
    if (pathname === '/') {
      return 'pg-home';
    }

    return 'pg-simple';
  }, [ pathname ]);

  useEffect(() => {
    document.body.classList.add(bodyClass);

    return () => {
      document.body.classList.remove(bodyClass);
    };
  }, [ bodyClass ]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Metadata />
      <TrackingFPixel />
      <TrackingGTag />
      <CookiesBanner />
      <Lightbox />
      <NavBar />
      { children }
      <Footer />
    </>
  );
};

export default AppWrapper;
