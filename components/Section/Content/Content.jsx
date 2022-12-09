import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const remarkPlugins = [ remarkGfm ];

// eslint-disable-next-line arrow-body-style
const SectionContent = ({ children }) => {
  return !!children && (
    <div className="section__content">
      <ReactMarkdown remarkPlugins={ remarkPlugins }>
        { children }
      </ReactMarkdown>
    </div>
  );
};

export default SectionContent;
