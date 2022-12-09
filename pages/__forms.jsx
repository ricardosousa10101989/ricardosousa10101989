// This is only so that Netlify picks up the form, conditionally rendering certain elements on the
// page itself would lead to hydration errors.

import Contact from 'components/Contact/Contact';

// eslint-disable-next-line arrow-body-style
const __Forms = () => {
  return (
    <Contact netlify />
  );
};

export default __Forms;
