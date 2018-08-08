const path = require('path');

const distPath = path.join(__dirname, '/frontend/static/');

const isDevelopment = 'development';
const isProduction = !isDevelopment;

module.exports = {
    entry: {
        main: './frontend/src/index.js',
    },

    output: {
        path: distPath,
        filename: 'index.js',
    },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
          use: [{
              loader: 'style-loader'
          }, {
              loader: 'css-loader'
          }, {
              loader: 'less-loader'
          }]
      },
    ]
  },
};