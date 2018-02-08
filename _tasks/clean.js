/**
 * @file clean.js - Clean directory with Gulp task
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import del from 'del'

module.exports = (gulp, data, argv) => {
  gulp.task('clean:all', () => {
      if (!argv.prod) {
        return del([
          data.paths.dist.base
        ])
      }
  });
}
