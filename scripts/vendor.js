/* eslint-disable no-console */

const fs = require('fs-extra');

// Include FontAwesome Webfonts for proper icon rendering
fs.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/lib/webfonts', err => err && console.error(err));

// Copy Netlify CMS from dependency directory
fs.copy('node_modules/netlify-cms/dist/netlify-cms.js', 'public/lib/netlify-cms.js', err => err && console.error(err));

// Tiny Slider
fs.copy('node_modules/tiny-slider/dist/tiny-slider.css', 'public/lib/tiny-slider.css', err => err && console.error(err));

// Lightbox
fs.copy('node_modules/lightbox2/dist', 'public/lib/lightbox', err => err && console.error(err));
