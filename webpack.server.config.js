const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.config');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, 'src/entry-server.js'),

  target: 'node',

  devtool: 'source-map',

  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2',
  },

  externals: nodeExternals({
    whitelist: /\.css$/,
  }),

  plugins: [new VueSSRServerPlugin() /* new VueSSRClientPlugin() */],
});
