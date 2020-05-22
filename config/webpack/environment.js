const { environment } = require('@rails/webpacker')
const webpack = require('webpack');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

environment.plugins.append(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
  }),
);

environment.loaders.append('file', {
  test: /\.ttf$/,
  use: ['file-loader']
})
environment.loaders.append('style', {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  include: path.resolve(__dirname, '../')
})
environment.plugins.append(
  'MonacoWebpack',
  new MonacoWebpackPlugin(),
);
module.exports = environment
