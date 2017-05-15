var server = require('./webpack.server.config')
var path = require('path')
require('babel-core/register')
require('babel-polyfill')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const fronted = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {'@': resolve('source')}
  },

  entry: {
    app :  ['babel-polyfill', resolve('source/index.js')]
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.css?$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1, modules: true, localIdentName: '[name]__[hash:base64:5]'
          }
      }],
      },
      {
        test: /\.(jpg|png|gif|eot|ttf|woff|woff2|svg)$/,
        use: [{
          loader: 'file-loader',
          options:{
            name: 'assets/img/[name].[ext]'
          }
        }]
      }
    ]
  }
}

module.exports = [
  server,
  fronted
]