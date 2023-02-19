import classnames from 'classnames';

import IconTree from 'components/Icon/Tree';

const IconForest = ({ className }) => (
  <div className={ classnames('icon-forest', className) }>
    <IconTree />
    <IconTree />
  </div>
);

export default IconForest;
