import Button from 'components/Button/Button';
import Section from 'components/Section/Section';
import SectionContent from 'components/Section/Content/Content';
import SectionHeading from 'components/Section/Heading/Heading';

import useCookiesBanner from 'hooks/useCookiesBanner';
import usePageData from 'hooks/usePageData';
import useRouter from 'hooks/useRouter';

import cookiesBannerYml from 'content/cookies_banner.yml';

const Slug = () => {
  const pageData = usePageData();
  const { path } = useRouter();
  const [ , setCookiesBanner ] = useCookiesBanner();

  return (
    <Section>
      <div className="container">
        <SectionHeading>{ pageData?.title }</SectionHeading>
        <SectionContent>{ pageData?.__content }</SectionContent>

        { path === '/cookies' && (
          <div className="row">
            <div className="col text-center">
              <Button
                onClick={ () => {
                  setCookiesBanner('options');
                } }
              >
                { cookiesBannerYml.options }
              </Button>
            </div>
          </div>
        ) }
      </div>
    </Section>
  );
};

export const getStaticProps = async ({ params }) => {
  const fs = await import('fs');
  const yamlFront = await import('yaml-front-matter');

  const { slug } = params;
  const contents = await fs.promises.readFile(`${process.cwd()}/content/simple-pages/${slug}.md`);
  const pageData = yamlFront.loadFront(contents);

  return {
    props: {
      ...params,
      pageData,
    },
  };
};

export const getStaticPaths = async () => {
  const fs = await import('fs');
  const files = await fs.promises.readdir(`${process.cwd()}/content/simple-pages`);

  return {
    fallback: false,
    paths: files
      .filter(file => file.endsWith('.md'))
      .map(file => ({
        params: {
          slug: file.split('/').pop().replace(/\.md$/, ''),
        },
      })),
  };
};

export default Slug;
