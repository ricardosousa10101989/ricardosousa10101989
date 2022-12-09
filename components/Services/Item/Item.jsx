import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line arrow-body-style
const ServicesItem = ({ details, icon, title }) => {
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

      { details?.length > 1 && (
        <ul className="services__details">
          { details.map(({ detail }) => (
            <li
              key={ detail }
              className="services__details-item"
            >
              { detail }
            </li>
          )) }
        </ul>
      ) }

      { details?.length === 1 && (
        <div className="services__details">
          <div className="services__details-item services__details-item--single">
            { details[0].detail }
          </div>
        </div>
      ) }
    </div>
  );
};

export default ServicesItem;
