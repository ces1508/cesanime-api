var webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var nodeModules = {};
var path = require('path')
require('babel-core/register')
require('babel-polyfill')

function resolve (dir) {
  return path.join(__dirname, dir)
}

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

module.exports = {
entry: {
  server: ['babel-polyfill', resolve('source/server.js')]
},
  output: {
    path: resolve(''),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test:  /\.json$/, loader: 'json-loader' },
    ]
  },
  target: 'node',
}
