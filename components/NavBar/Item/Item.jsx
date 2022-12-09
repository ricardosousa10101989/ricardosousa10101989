import classnames from 'classnames';

import Link from 'components/Link';

import useActiveSection from 'hooks/useActiveSection';

const NavBarItem = ({ children, id, onClick }) => {
  const { activeSection } = useActiveSection();

  return (
    <Link
      className={ classnames('nav-item nav-link', {
        'page-scroll--active': activeSection === id,
      }) }
      onClick={ onClick }
      to={ `#${id}` }
    >
      { children }
    </Link>
  );
};

NavBarItem.defaultProps = {
  onClick: null,
};

export default NavBarItem;
