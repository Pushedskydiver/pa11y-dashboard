/**
 * @file stylelint.js - Check for any styling issues in scss files
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import { src } from 'gulp';
import plugins from 'gulp-load-plugins';
import { argv, data } from '../gulpfile.babel';

const $ = plugins();

function stylelint() {
  return src(`${data.paths.source.styles}**/*.scss`)
    .pipe($.stylelint({
      configFile: data.stylelint,
      failAfterError: argv.prod,
      syntax: 'scss',
      reportOutputDir: data.paths.reports.stylelint,
      reporters: [
        { formatter: 'string', console: true },
        { formatter: 'verbose', save: 'stylelint.txt' }
      ]
    }));
}

export default stylelint;
