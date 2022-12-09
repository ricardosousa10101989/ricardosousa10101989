import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// eslint-disable-next-line arrow-body-style
const ServicesItem = ({ details, icon, title }) => {
  return (
    <div className="services__col col-md-6">
      <div className="services__item">
        <div className="services__heading">
          { !!icon && (
            <FontAwesomeIcon
              className="services__icon"
              icon={ `${icon} fa-inverse` }
            />
          ) }

          { !!title && (
            <h4 className="services__title">{ title }</h4>
          ) }
        </div>

        { !!details?.length && (
          <ul className="services__details">
            { details.map(({ detail }) => (
              <li
                key={ detail }
                className="section__content"
              >
                { detail }
              </li>
            )) }
          </ul>
        ) }
      </div>
    </div>
  );
};

export default ServicesItem;
