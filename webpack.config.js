const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require('glob');
const path = require('path');
const vendorPath = path.resolve(__dirname, 'src/scripts/vendor');
const plugin = require('./_config/plugins.json');

module.exports = function(argv) {
  let webpackConfig = {
    entry : {
      common: glob.sync('./src/scripts/common/*.js'),
      vendor: glob.sync('./src/scripts/vendor/*.js')
    },

    output: {
      path: path.resolve(__dirname, 'public/js'),
      filename: '[name].bundle.js',
    },

    module: {
      rules: [
        {
          test: /\.js*/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: 'env'
          }
        }
      ]
    },

    cache: false,

    watch: false,

    devtool: 'source-map',

    plugins: [
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: Infinity,
      }),
      // new BundleAnalyzerPlugin()
    ],

    resolve: {
      alias: {
        // Make it so that 'require' finds the right file.
        'cookies': path.join(vendorPath, 'cookies'),
        'zenscroll': path.join(vendorPath, 'zenscroll-min'),
        'lazyload': path.join(vendorPath, 'lazyload.min'),
        'prism' : path.join(vendorPath, 'prism')
      },
      extensions: ['.js']
    }
  };

  if(argv.prod) {
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin(plugin.uglify),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    );
  } else {
    webpackConfig.entry.vendor = glob.sync('./src/scripts/vendor/**/*.js'),
    webpackConfig.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: false,
        warnings: false,
        sourceMap: true,
        mangle: false
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"'
      })
    );
  }

  return webpackConfig;
};
