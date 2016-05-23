module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  output: {
    path: './',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react'],
        }
      }
    ]
  }
}
