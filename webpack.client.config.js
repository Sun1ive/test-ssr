const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, './src/entry-client.js'),
  plugins: [
    // Важно: это разбивает webpack runtime на главный фрагмент так,
    // чтобы асинхронные части могли быть внедрены сразу после него.
    // Это также позволяет лучше кэшировать код вашего приложения / вендоров.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    // Плагин генерирует `vue-ssr-client-manifest.json` в output-каталоге
    new VueSSRClientPlugin(),
  ],
});
