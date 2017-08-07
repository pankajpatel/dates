module.exports = {
  module:{
    loaders: [
      {
        test: /.scss?$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/
      },
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  }
}
