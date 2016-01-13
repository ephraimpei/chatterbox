module.exports = {
  entry: './app/src/main.js',
  output: {
    path: './app/static/javascripts',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$|\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [ 'es2015', 'react', 'stage-0' ]
      }
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ["style", "css", "sass"]
    }]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
