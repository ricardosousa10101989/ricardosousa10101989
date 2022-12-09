import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Markdown from 'components/Markdown/Markdown';

// eslint-disable-next-line arrow-body-style
const ServicesItem = ({ detail, icon, title }) => {
  return (
    <div className="services__item">
      { !!icon && (
        <FontAwesomeIcon
          className="services__icon"
          icon={ `${icon} fa-inverse` }
        />
      ) }

      { !!title && (
        <h4 className="services__title">{ title }</h4>
      ) }

      <Markdown className="services__detail">
        { detail }
      </Markdown>
    </div>
  );
};

export default ServicesItem;
