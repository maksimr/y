const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.css$/,
        loader: [
          require.resolve('style-loader'),
          require.resolve('css-loader')
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require.resolve('./index.html')
    })
  ]
};