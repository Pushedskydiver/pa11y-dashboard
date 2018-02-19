const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const glob = require('glob');
const path = require('path');
const plugin = require('./_config/plugins.json');

module.exports = function(argv) {
  let webpackConfig = {
    entry : {
      common: glob.sync('./src/scripts/common/*.js'),
      vendor: ['jquery', 'flot', 'flot-time', 'flot-selection', 'html2canvas']
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
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      // new BundleAnalyzerPlugin()
    ],

    resolve: {
      alias: {
        // Make it so that 'require' finds the right file.
        'jquery': 'node_modules/jquery/dist/jquery.min',
        'flot': 'node_modules/flot/jquery.flot',
        'flot-time': 'node_modules/flot/jquery.flot.time',
        'flot-selection': 'node_modules/flot/jquery.flot.selection',
        'html2canvas': 'node_modules/html2canvas/dist/html2canvas.min'
      },
      modules: [
        path.resolve('./'),
        path.resolve('./node_modules')
      ],
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
