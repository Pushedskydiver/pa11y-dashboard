/**
 * @file scripts.js - Combine scripts into single file and uglify
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import webpack from 'webpack'
import plugins from 'gulp-load-plugins'

const $ = plugins()

module.exports = (gulp, data, argv) => {
  gulp.task('scripts:compile', () => {
      const webpackConfig = require('../webpack.config')(argv);

      return gulp.src('')
          .pipe($.webpack(webpackConfig, webpack))
          .pipe(gulp.dest(data.paths.dist.scripts));
  });
}
