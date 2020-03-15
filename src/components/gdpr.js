// Polyfill for SimpleGDPR
import 'parent-node-prepend-polyfill';

import safe from '../utils/safe';

safe(() => {
  const {
    Cookies,
    GDPR_VARIABLES,
    location,
    SimpleGDPR,
  } = window;

  const options = {
    float: 'bottom-left',
    openOnInit: false,
    theme: 'material',
    title: null,
  };

  if (GDPR_VARIABLES && GDPR_VARIABLES.message) {
    options.message = GDPR_VARIABLES.message;
  }

  const notice = new SimpleGDPR(options);

  notice.setCallback(() => {
    Cookies.set('gdpr', 'agreed', { expires: 365, path: location.pathname });
    notice.close();
  });

  if (Cookies.get('gdpr') !== 'agreed') {
    notice.open();
  }

  const fa = document.createElement('i');
  fa.classList.add('fas');
  fa.classList.add('fa-info');
  fa.classList.add('sgdpr-info-icon-fa');
  const icon = document.getElementById('sgdpr-info-icon');
  icon.appendChild(fa);

  if (GDPR_VARIABLES && GDPR_VARIABLES.accept) {
    const accept = document.getElementById('sgdpr-button').querySelector('.sgdpr-text');
    accept.textContent = GDPR_VARIABLES.accept;
  }
});
