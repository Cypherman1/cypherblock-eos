const {resolve} = require('path');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      extractComments: true
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: resolve(__dirname, '..', 'src', 'client', 'index.html'),
      favicon: resolve(__dirname, '..', 'src', 'client', 'assets', 'imgs', 'favicon.png'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: false,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
