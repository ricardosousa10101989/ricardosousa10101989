import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'components/Link';

import general from 'content/general.yml';

// eslint-disable-next-line arrow-body-style
const Footer = () => {
  return (
    <footer>
      <div className="container footer__container">
        <div className="row">
          { !!general.social.length && (
            <ul className="list-inline social-buttons">
              { general.social.map(social => (
                <li key={ social.link }>
                  <Link
                    aria-label={ social.label }
                    to={ social.link }
                  >
                    <FontAwesomeIcon icon={ social.icon } />
                  </Link>
                </li>
              )) }
            </ul>
          ) }
        </div>

        <div className="row">
          <div className="footer__links">
            <Link to="/condicoes-de-utilizacao">Condições de Utilização</Link>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            <Link to="/cookies">Política de Cookies</Link>
          </div>
        </div>

        <div className="row">
          <div className="copyright">{ general?.footer }</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
