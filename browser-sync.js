module.exports = {
  server: {
    baseDir: 'public',
    routes: {
      '/node_modules': 'node_modules',
      '/scss': 'scss',
      '/src': 'src',
    },
  },

  ghostMode: false,
  port: 3000,
  ui: false,
  watch: true,
};
