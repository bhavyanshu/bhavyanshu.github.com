module.exports = {
  entry: {
    'plugins.js': './webpack/plugins.js',
    'app.js': './webpack/app.js'
  },
  output: {
    // we’re going to put the generated file in the assets folder so jekyll will grab it.
    path: __dirname + '/assets/themes/hooligan/js/',
    filename: '[name]'
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
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
      }
    ]
  }
};
