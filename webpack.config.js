const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const glob = require('glob');

function Bundle() {
  const plugin = require('./_config/plugins.json');
  const prod = process.env.NODE_ENV === 'production';

  const alias = {
    // Make it so that 'require' finds the right file.
    'jquery': 'node_modules/jquery/dist/jquery.min',
    'flot': 'node_modules/flot/jquery.flot',
    'flot-time': 'node_modules/flot/jquery.flot.time',
    'flot-selection': 'node_modules/flot/jquery.flot.selection',
    'html2canvas': 'node_modules/html2canvas/dist/html2canvas.min'
  };

  const plugins = [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // new BundleAnalyzerPlugin()
  ];

  return {
    cache: false,

    devtool: !prod ? 'source-map' : 'eval',

    entry: {
      common: path.resolve(__dirname, 'src/scripts/main.js'),
      vendor: ['jquery', 'flot', 'flot-time', 'flot-selection']
    },

    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: '[name].bundle.js',
    },

    mode: prod ? 'production' : 'development',

    module: {
      rules: [
        {
          test: /\.js*/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      ]
    },

    cache: false,

    watch: prod ? false : true,

    devtool: 'source-map',

    optimization: {
      minimizer: prod ? [new TerserPlugin(plugin.uglify)] : [new TerserPlugin({
        terserOptions: {
          minimize: false,
          warnings: false,
          mangle: false
        }
      })]
    },

    plugins,

    resolve: {
      alias,
      modules: [
        path.resolve('./'),
        path.resolve('./node_modules')
      ],
      extensions: ['.ts', '.js']
    },
  };
}

module.exports = Bundle();
