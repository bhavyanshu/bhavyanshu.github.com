module.exports = {
  entry: {
    plugins: './webpack/plugins.js',
    app: './webpack/app.js'
  },
  output: {
    // we’re going to put the generated file in the assets folder so jekyll will grab it.
    path: __dirname + '/assets/themes/hooligan/js/',
    filename: '[name].js'
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
    }
    ]
  }
};
