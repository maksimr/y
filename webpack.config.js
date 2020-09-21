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

module.exports = (env, argv) => ({
  output: {
    filename: '[name].[contenthash].js'
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: require.resolve('babel-loader')
      },
      {
        test: /\.svg$/,
        loader: require.resolve('svg-inline-loader')
      },
      {
        test: /\.css$/,
        loader: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {esModule: true}
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: {
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          }
        ].concat(argv.mode === 'production' ? postCssPurge : [])
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
});