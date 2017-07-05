module.exports = {
  entry: {
    'bootstrap.js' : './webpack/bootstrap.js',
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
        test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: 'imports-loader?jQuery=jquery'
      },
      {
        test: /\.scss$/,
        loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
      },
      {
        test: /\.(woff2?|svg)$/,
        loader: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file-loader?&name=fonts/[name].[ext]'
      }
    ]
  }
};
