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

export default Homepage;
