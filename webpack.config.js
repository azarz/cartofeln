const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  plugins: [
    new Dotenv(),
  ],
  output: {
    path: path.resolve(__dirname, 'www/js'),
    filename: 'index.bundle.js',
  },
  devtool: 'inline-source-map',
};
