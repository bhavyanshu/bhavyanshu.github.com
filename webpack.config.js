var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var fontPath = './assets/themes/hooligan/fonts/';
var buildPath = '/assets/themes/hooligan/';

module.exports = {
  entry: {
    'js/bootstrap.js' : './webpack/js/bootstrap.js',
    'js/plugins.js': './webpack/js/plugins.js',
    'js/app.js': './webpack/js/app.js'
  },
  output: {
    // we’re going to put the generated file in the assets folder so jekyll will grab it.
    path: __dirname + '/assets/themes/hooligan/',
    filename: '[name]',
    publicPath: buildPath
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000&name=./fonts/[hash].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader?name=./fonts/[hash].[ext]'
      },
      {
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  plugins: [

    new ExtractTextPlugin({
      filename: "[name].css"
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};
