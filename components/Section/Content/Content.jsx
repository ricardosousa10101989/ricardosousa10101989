import Markdown from 'components/Markdown/Markdown';

// eslint-disable-next-line arrow-body-style
const SectionContent = ({ children }) => {
  return !!children && (
    <Markdown className="section__content">
      { children }
    </Markdown>
  );
};

export default SectionContent;
