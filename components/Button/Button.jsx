import classnames from 'classnames';

import Link from 'components/Link';

const Button = ({
  children, className, to, variant, ...props
}) => {
  if (to) {
    return (
      <Link
        className={ classnames('btn', className, {
          [`btn-${variant}`]: variant,
        }) }
        to={ to }
        { ...props }
      >
        { children }
      </Link>
    );
  }

  return (
    <button
      className={ classnames('btn', className, {
        [`btn-${variant}`]: variant,
      }) }
      type="button"
      { ...props }
    >
      { children }
    </button>
  );
};

Button.defaultProps = {
  variant: 'primary',
};

export default Button;
