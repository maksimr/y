const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postCssPurge = {
  loader: require.resolve('postcss-loader'),
  options: {
    postcssOptions: {
      plugins: [
        require('@fullhuman/postcss-purgecss')({
          content: ['src/**/*.js', 'lib/**/*.js'],
          extractors: [
            {
              extractor: (content) => content.match(/\w+/g) || [],
              extensions: ['js']
            }
          ]
        })
      ]
    }
  }
};

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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {esModule: true}
          },
          require.resolve('css-loader'),
          postCssPurge
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: require.resolve('./index.html')
    })
  ]
};