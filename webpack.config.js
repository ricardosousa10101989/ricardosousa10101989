const path = require('path'); // eslint-disable-line import/no-extraneous-dependencies

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public', 'js'),
  },

  devtool: mode === 'development' ? 'source-map' : false,
  mode,

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: [
      '.js',
      '.json',
    ],
  },
};
