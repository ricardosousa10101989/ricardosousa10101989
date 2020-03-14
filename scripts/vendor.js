/* eslint-disable no-console */

const fs = require('fs-extra');

const error = err => err && console.error(err);

// jQuery
fs.copy('node_modules/jquery/dist/jquery.min.js', 'public/lib/jquery.min.js', error);

// Bootstrap
fs.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/lib/bootstrap.min.js', error);

// Include FontAwesome Webfonts for proper icon rendering
fs.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/lib/webfonts', error);

// Copy Netlify CMS from dependency directory
fs.copy('node_modules/netlify-cms/dist/netlify-cms.js', 'public/lib/netlify-cms.js', error);

// Lightbox
fs.copy('node_modules/lightbox2/dist', 'public/lib/lightbox', error);
