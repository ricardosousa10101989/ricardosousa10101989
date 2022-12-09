import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from 'components/Link';

import usePageData from 'hooks/usePageData';

const Footer = () => {
  const pageData = usePageData();

  return (
    <footer>
      <div className="container footer__container">
        <div className="row">
          { !!pageData?.social.length && (
            <ul className="list-inline social-buttons">
              { pageData.social.map(social => (
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
          <div className="copyright">{ pageData?.footer }</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
