import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const remarkPlugins = [ remarkGfm ];

// eslint-disable-next-line arrow-body-style
const Markdown = ({ children, className }) => {
  return !!children && (
    <ReactMarkdown
      className={ classnames('markdown', className) }
      remarkPlugins={ remarkPlugins }
    >
      { children }
    </ReactMarkdown>
  );
};

export default Markdown;
