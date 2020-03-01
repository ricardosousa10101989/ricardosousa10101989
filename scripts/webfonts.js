const fs = require('fs-extra');

fs.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts', (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
});
