import { forwardRef, useEffect } from 'react';
import classnames from 'classnames';

import useActiveSection from 'hooks/useActiveSection';

const Section = forwardRef(({
  As, children, className, id, ...props
}, ref) => {
  const { register, unregister } = useActiveSection();

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (id) {
        unregister(id);
      }
    };
  }, [ id, unregister ]);

  return (
    <As
      className={ classnames('main-section', className) }
      id={ id }
      ref={ el => {
        if (id) {
          register(id, el);
        }

        if (typeof ref === 'function') {
          ref(el);
        }
        else if (typeof ref === 'object' && ref && 'current' in ref) {
          ref.current = el;
        }
      } }
      { ...props }
    >
      { children }
    </As>
  );
});

Section.defaultProps = {
  As: 'section',
};

export default Section;
