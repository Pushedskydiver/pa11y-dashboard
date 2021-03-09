/**
 * @file gulpfile
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import { parallel, series, watch } from 'gulp';
import yargs from 'yargs'

export const argv = yargs.argv

export const data = {
  paths: require('./_config/paths.json'),
  plugin: require('./_config/plugins.json'),
  stylelint: './_config/stylelint.json',
}


/* ============================================================ *\
    Require tasks
\* ============================================================ */

import clean from './_tasks/clean';
import { copyFavicons, copyManifest, copyFonts } from './_tasks/copy';
import { images } from './_tasks/images';
import imports from './_tasks/imports';
import stylelint from './_tasks/stylelint';
import styles from './_tasks/styles';


/* ============================================================ *\
    Watch task
\* ============================================================ */

function watchFiles() {
  // Watch image files
  watch(`${data.paths.source.images}**/*`, images);

  // Watch .scss files
  watch(`${data.paths.source.styles}**/*.scss`, series(styles, stylelint));
}


/* ============================================================ *\
    Define tasks
\* ============================================================ */

const watchTask = parallel(watchFiles);
const buildTask = series(
  clean,
  imports, styles,
  images,
  copyFavicons, copyManifest, copyFonts
);

exports.default = buildTask;
exports.watch = watchTask;
exports.dev = series(buildTask, watchTask);
