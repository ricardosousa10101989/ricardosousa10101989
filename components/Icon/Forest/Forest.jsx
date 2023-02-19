import classnames from 'classnames';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import IconFlower from 'components/Icon/Flower';
import IconTree from 'components/Icon/Tree';

const IconForest = ({ className }) => (
  <div className={ classnames('icon-forest', className) }>
    <IconTree />
    <IconTree />
    <IconFlower />
    { /*
    <IconFlower />
    <FontAwesomeIcon icon="fa-solid fa-seedling" />
    */ }
  </div>
);

export default IconForest;
