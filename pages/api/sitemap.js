import absoluteUrl from 'utils/absoluteUrl';

const sitemap = async (req, res) => {
  const pages = [
    {
      changefreq: 'monthly',
      lastmod: '',
      loc: absoluteUrl('/'),
      priority: 1,
    },
  ];
  res.send(JSON.stringify(process.env));

//   res.send(`<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// </urlset>
// `);
};

export default sitemap;
