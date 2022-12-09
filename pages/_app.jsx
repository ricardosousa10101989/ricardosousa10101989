import Head from 'next/head';

// https://fontawesome.com/docs/web/use-with/react/use-with
// https://fontawesome.com/v6/docs/web/use-with/react/add-icons
// import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import CookiesBanner from 'components/CookiesBanner/CookiesBanner';
import Lightbox from 'components/Lightbox/Lightbox';
import Metadata from 'components/Metadata';
import TrackingFPixel from 'components/Tracking/FPixel';
import TrackingGTag from 'components/Tracking/GTag';

import usePageData from 'hooks/usePageData';

import 'scss/style.scss';
import 'utils/netlify';

// `require()` instead of `import` due to https://github.com/FortAwesome/Font-Awesome/issues/19348
const { config, library } = require('@fortawesome/fontawesome-svg-core');

config.autoAddCss = false;
library.add(fas);
library.add(fab);

// eslint-disable-next-line arrow-body-style
const MyApp = ({ Component, pageProps }) => {
  usePageData(pageProps?.pageData);

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
      <Component { ...pageProps } />
    </>
  );
};

export default MyApp;
