// Common CSS Loading Configs
const cssLoader = ['style-loader', {
  loader: 'css-loader',
  options: {
    minimize: true,
  },
}];

module.exports = {
  module:{
    rules: [
      {
        test: /\.scss$/,
        use: cssLoader.concat(['sass-loader']),
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'stage-0'],
            plugins: ['transform-object-rest-spread']
          },
        },
      },
    ],
  }
}
