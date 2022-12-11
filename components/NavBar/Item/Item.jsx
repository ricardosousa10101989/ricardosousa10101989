import classnames from 'classnames';

import Link from 'components/Link';

import useActiveSection from 'hooks/useActiveSection';
import useDrawerMenu from 'hooks/useDrawerMenu';

const NavBarItem = ({ children, id, to }) => {
  const { activeSection } = useActiveSection();
  const [ , setDrawerMenu ] = useDrawerMenu();

  return (
    <Link
      className={ classnames('nav-item nav-link', {
        'page-scroll--active': id && activeSection === id,
      }) }
      onClick={ () => setDrawerMenu(false) }
      to={ to || `#${id}` }
    >
      { children }
    </Link>
  );
};

export default NavBarItem;
