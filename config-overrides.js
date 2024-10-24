const {
  addWebpackPlugin,
  override,
  addWebpackModuleRule,
} = require('customize-cra');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();
const CopyPlugin = require('copy-webpack-plugin');

module.exports = override(
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  addWebpackPlugin(
    new webpack.ContextReplacementPlugin(
      /\/@atomicfinance\/bitcoin-dlc-provider\//,
      (data) => {
        delete data.dependencies[0].critical;
        delete data.dependencies[1].critical;
        return data;
      }
    )
  ),
  addWebpackPlugin(
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/cfd-dlc-js-wasm/dist/*.wasm',
          to: 'static/js/[name][ext]', // Adjusted to maintain the file name
        },
        {
          from: 'node_modules/cfd-js-wasm/dist/*.wasm',
          to: 'static/js/[name][ext]', // Adjusted to maintain the file name
        },
      ],
    })
  ),
  addWebpackModuleRule({
    test: /_wasm\.js$/,
    loader: 'exports-loader',
    options: {
      type: 'commonjs',
      exports: 'single Module',
    },
  }),
  addWebpackModuleRule({
    test: /cfdjs_wasm_jsonapi\.js/,
    loader: 'exports-loader',
    options: {
      type: 'commonjs',
      exports: ['callJsonApi', 'ccallCfd', 'CfdError'],
    },
  }),
  (config) => {
    config.resolve.fallback = {
      'process': require.resolve('process/browser'),
      "path": require.resolve("path-browserify"),
      "fs": false,
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      "vm": require.resolve("vm-browserify"),
      "assert": require.resolve("assert/"),
      "util": require.resolve("util/"),
      "zlib": require.resolve("browserify-zlib"),
    };
    config.ignoreWarnings = [/Failed to parse source map/];
    
    // Add this new section
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      })
    );

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    };
    
    return config;
  }
);
