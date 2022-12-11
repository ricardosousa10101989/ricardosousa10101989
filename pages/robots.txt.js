import absoluteUrl from 'utils/absoluteUrl';

const RobotsTxt = () => null;

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader('Content-Type', 'text/plain');
  res.write(`
User-agent: *
Allow: /

Sitemap: ${absoluteUrl('/sitemap.xml', req)}
`);
  res.end();
};

export default RobotsTxt;
