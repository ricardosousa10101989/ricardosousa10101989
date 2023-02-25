import classnames from 'classnames';

// eslint-disable-next-line arrow-body-style
const SectionHeading = ({ children, className }) => {
  return (
    <h2
      className={ classnames('section-heading', className) }
    >
      { children }
    </h2>
  );
};

export default SectionHeading;
