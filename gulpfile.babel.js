/**
 * @file gulpfile
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

'use strict'

import gulp from 'gulp'
import yargs from 'yargs'
import runSeq from 'run-sequence'

const argv = yargs.argv

const data = {
  paths: require('./_config/paths.json'),
  plugin: require('./_config/plugins.json'),
  stylelint: './_config/stylelint.json',
  eslint: './_config/eslint.json'
}


/* ============================================================ *\
    Require tasks
\* ============================================================ */

require('./_tasks/clean.js')(gulp, data, argv);
require('./_tasks/copy.js')(gulp, data);
require('./_tasks/images.js')(gulp, data);
require('./_tasks/imports.js')(gulp, data);
require('./_tasks/eslint.js')(gulp, data, argv);
require('./_tasks/scripts.js')(gulp, data, argv);
require('./_tasks/stylelint.js')(gulp, data, argv);
require('./_tasks/styles.js')(gulp, data, argv);


/* ============================================================ *\
    Task aliases
\* ============================================================ */

gulp.task('dev', callback => {
  runSeq(
    'default',
    'watch',
    callback
  )
});

gulp.task('default', callback => {
  runSeq(
    'clean:all',
    'imports:sass',
    ['styles:sass', 'scripts:compile'],
    'images',
    ['copy:favicons', 'copy:manifest', 'copy:fonts'],
    callback
  )
});


/* ============================================================ *\
    Watch tasks
\* ============================================================ */

gulp.task('watch', () => {
    // Watch image files
    gulp.watch(`${data.paths.source.images}**/*`, ['images']);

    // Watch .scss files
    gulp.watch(`${data.paths.source.styles}**/*.scss`, ['styles:sass', 'stylelint']);

    // Watch .js files
    gulp.watch(`${data.paths.source.scripts.common}*.js`, ['scripts:compile', 'eslint']);
});
