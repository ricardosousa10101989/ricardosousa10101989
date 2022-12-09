import Homepage from 'pages/homepage';

export const getStaticProps = async ({ params }) => {
  const fs = await import('fs');
  const yamlFront = await import('yaml-front-matter');
  const contents = await fs.promises.readFile(`${process.cwd()}/content/_index.md`);
  const pageData = yamlFront.loadFront(contents);

  return {
    props: {
      ...params,
      pageData,
    },
  };
};

console.log({
  url: process.env.URL,
  deploy_url: process.env.DEPLOY_URL,
  deploy_prime_url: process.env.DEPLOY_PRIME_URL,
  env: process.env,
});

export default Homepage;
