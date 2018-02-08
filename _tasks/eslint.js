/**
 * @file eslint.js - Check for any linting issues in common js files
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import plugins from 'gulp-load-plugins'
import fs from 'fs'

const $ = plugins()

module.exports = (gulp, data, argv) => {
  function isFixed(file) {
    return file.eslint && typeof file.eslint.output === 'string';
  }

  gulp.task('eslint', () => {
      return gulp.src(`${data.paths.source.scripts.common}*.js`)
        .pipe($.eslint({
          configFile: data.eslint,
          fix: true
        }))
        .pipe($.eslint.format())
        .pipe($.eslint.format('html', fs.createWriteStream(`${data.paths.reports.eslint}eslint.html`)))
        .pipe($.if(isFixed, gulp.dest(data.paths.source.scripts.common)))
        .pipe($.if(argv.prod, $.eslint.failAfterError()));
  });
}
