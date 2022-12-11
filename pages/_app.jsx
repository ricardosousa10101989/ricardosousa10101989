// https://fontawesome.com/docs/web/use-with/react/use-with
// https://fontawesome.com/v6/docs/web/use-with/react/add-icons
// import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';

import AppWrapper from 'components/AppWrapper';

import usePageData from 'hooks/usePageData';
import useRouter from 'hooks/useRouter';

import 'scss/style.scss';
import 'utils/netlify';

// `require()` instead of `import` due to https://github.com/FortAwesome/Font-Awesome/issues/19348
const { config, library } = require('@fortawesome/fontawesome-svg-core');

config.autoAddCss = false;
library.add(fas);
library.add(fab);

const appWrapperExclusions = [ '/admin' ];

// eslint-disable-next-line arrow-body-style
const MyApp = ({ Component, pageProps }) => {
  usePageData(pageProps?.pageData);

  const { pathname } = useRouter();

  if (appWrapperExclusions.includes(pathname)) {
    return (
      <Component { ...pageProps } />
    );
  }

  return (
    <AppWrapper>
      <Component { ...pageProps } />
    </AppWrapper>
  );
};

export default MyApp;
