import NextLink from 'next/link';

import { useCallback } from 'react';

const Link = ({
  children, className, onClick, to, ...props
}) => {
  const clickHandler = useCallback(event => {
    if (to?.startsWith('#')) {
      const target = document.querySelector(to);
      if (target) {
        event.preventDefault();

        // Smooth scrolling feature
        target.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }

    if (onClick) {
      onClick(event);
    }
  }, [ onClick, to ]);

  if (to?.startsWith('http://') || to?.startsWith('https://')) {
    return (
      <a
        className={ className }
        href={ to }
        onClick={ clickHandler }
        rel="noopener noreferrer"
        target="_blank"
        { ...props }
      >
        { children }
      </a>
    );
  }

  if (to?.startsWith('tel:') || to?.startsWith('mailto:')) {
    return (
      <a
        className={ className }
        href={ to }
        onClick={ clickHandler }
        { ...props }
      >
        { children }
      </a>
    );
  }

  return (
    <NextLink
      className={ className }
      href={ to }
      onClick={ clickHandler }
      { ...props }
    >
      { children }
    </NextLink>
  );
};

export default Link;
