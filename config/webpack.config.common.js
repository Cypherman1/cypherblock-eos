const {resolve, join} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

const IS_DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  target: 'web',
  entry: ['./src/client/index.js'],
  output: {
    publicPath: '/',
    path: resolve(__dirname, '..', 'build', 'client'),
    filename: '[name][hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      },
      {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {sourceMap: IS_DEV}
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'css/'
              }
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: IS_DEV}
            },
            {
              loader: 'postcss-loader',
              options: {sourceMap: IS_DEV}
            }
          ]
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/'
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: IS_DEV
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new ServiceWorkerWebpackPlugin({
      entry: './src/client/sw.js'
    })
    // new BundleAnalyzerPlugin()
  ],
  resolve: {
    modules: ['node_modules', join('src', 'client')]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 10,
          enforce: true
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  stats: {
    assetsSort: '!size',
    children: false,
    chunks: false,
    colors: true,
    entrypoints: false,
    modules: false
  }
};
