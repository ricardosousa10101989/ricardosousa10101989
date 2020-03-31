/* eslint-disable no-console */

const fs = require('fs-extra');

const error = err => err && console.error(err);

// Bootstrap
fs.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/lib/bootstrap.min.js', error);

// Include FontAwesome Webfonts for proper icon rendering
fs.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/lib/webfonts', error);
