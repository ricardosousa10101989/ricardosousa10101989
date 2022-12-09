const withYaml = require('next-plugin-yaml');

module.exports = withYaml({
  images: {
    deviceSizes: [ 360, 414, 640, 768, 800, 828, 1080, 1280, 1366, 1440, 1536, 1600, 1920, 2560, 3840 ],
    imageSizes: [ 320, 480, 600, 720, 960, 1200 ],
  },

  // Need this for the /admin path to work properly, as without it Netlify CMS will try to use hash
  // routes as /admin#/ instead of /admin/#/
  trailingSlash: true,
});
