import absoluteUrl from 'utils/absoluteUrl';

const robots = async (req, res) => {
  res.send(`
User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml', req)}
`);
};

export default robots;
