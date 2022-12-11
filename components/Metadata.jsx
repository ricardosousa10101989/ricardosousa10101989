import Head from 'next/head';

import general from 'content/general.yml';

import useRouter from 'hooks/useRouter';

import absoluteUrl from 'utils/absoluteUrl';

// eslint-disable-next-line arrow-body-style
const Metadata = () => {
  const { path } = useRouter();

  return (
    <Head>
      <title>{ general.site_title }</title>
      <meta name="twitter:title" property="og:title" content={ general.site_title } />

      <link rel="canonical" href={ absoluteUrl(path) } />
      <meta property="og:url" content={ absoluteUrl(path) } />

      <meta name="twitter:description" property="og:description" content={ general.description } />
      <meta name="description" content={ general.description } />
      <meta name="twitter:image" property="og:image" content={ absoluteUrl(general.image) } />

      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Metadata;
