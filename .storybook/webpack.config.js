var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, 'src' , 'index.js')
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.join(__dirname, '../node_modules'),
    ]
  },
  module:{
    loaders: [
      {
        test: /.scss?$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    colors: true,
    historyApiFallback: true,
    inline: true
  },
  plugins: [
  ]
}
