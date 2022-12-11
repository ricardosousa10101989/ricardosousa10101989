import absoluteUrl from 'utils/absoluteUrl';

const SiteMapXml = () => null;

export const getServerSideProps = async ({ req, res }) => {
  const fs = await import('fs');
  const files = await fs.promises.readdir(`${process.cwd()}/content/simple-pages`);

  const lastTimestamp = (await fs.promises.stat(`${process.cwd()}/.next/build-manifest.json`)).mtimeMs;
  const lastmod = (new Date(lastTimestamp)).toISOString();

  const urls = [
    {
      changefreq: 'monthly',
      loc: absoluteUrl('/', req),
      priority: 1,
    },
    ...files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        changefreq: 'yearly',
        loc: absoluteUrl(
          `/${file.split('/').pop().replace(/\.md$/, '')}`,
          req,
        ),
        priority: 0.1,
      })),
  ];

  res.setHeader('Content-Type', 'text/xml');
  res.write(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `<url>
  <loc>${url.loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${url.changefreq}</changefreq>
  <priority>${url.priority}</priority>
</url>
`).join('')}
</urlset>
`);
  res.end();

  return {
    props: {},
  };
};

export default SiteMapXml;
