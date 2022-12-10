import {
  Html, Head, Main, NextScript,
} from 'next/document';

import absoluteUrl from 'utils/absoluteUrl';

import seo from 'data/seo.yml';

// We shouldn't have any logic here, if we ever want to change the lang attribute (i.e. site
// becomes multilang), we'll need to find another way, possibly through getInitialProps();
// see https://nextjs.org/docs/advanced-features/custom-document

const Document = () => (
  <Html lang="pt-PT">
    <Head>
      <meta charSet="utf-8" />
      <meta name="theme-color" content="#0d153e" />

      <meta name="google-site-verification" content={ seo.google_verification } />

      <link rel="shortcut icon" href={ absoluteUrl('/meta/favicon.ico') } />
      <link rel="icon" sizes="16x16 32x32 64x64" href={ absoluteUrl('/meta/favicon.ico') } />
      <link rel="icon" type="image/png" sizes="196x196" href={ absoluteUrl('/meta/favicon-192.png') } />
      <link rel="icon" type="image/png" sizes="160x160" href={ absoluteUrl('/meta/favicon-160.png') } />
      <link rel="icon" type="image/png" sizes="96x96" href={ absoluteUrl('/meta/favicon-96.png') } />
      <link rel="icon" type="image/png" sizes="64x64" href={ absoluteUrl('/meta/favicon-64.png') } />
      <link rel="icon" type="image/png" sizes="32x32" href={ absoluteUrl('/meta/favicon-32.png') } />
      <link rel="icon" type="image/png" sizes="16x16" href={ absoluteUrl('/meta/favicon-16.png') } />
      <link rel="apple-touch-icon" href={ absoluteUrl('/meta/favicon-57.png') } />
      <link rel="apple-touch-icon" sizes="60x60" href={ absoluteUrl('/meta/favicon-60.png') } />
      <link rel="apple-touch-icon" sizes="72x72" href={ absoluteUrl('/meta/favicon-72.png') } />
      <link rel="apple-touch-icon" sizes="76x76" href={ absoluteUrl('/meta/favicon-76.png') } />
      <link rel="apple-touch-icon" sizes="114x114" href={ absoluteUrl('/meta/favicon-114.png') } />
      <link rel="apple-touch-icon" sizes="120x120" href={ absoluteUrl('/meta/favicon-120.png') } />
      <link rel="apple-touch-icon" sizes="144x144" href={ absoluteUrl('/meta/favicon-144.png') } />
      <link rel="apple-touch-icon" sizes="152x152" href={ absoluteUrl('/meta/favicon-152.png') } />
      <link rel="apple-touch-icon" sizes="180x180" href={ absoluteUrl('/meta/favicon-180.png') } />
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content="meta/favicon-144.png" />
      <meta name="msapplication-config" content="meta/browserconfig.xml" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Droid+Serif:400i" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
    </Head>

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
