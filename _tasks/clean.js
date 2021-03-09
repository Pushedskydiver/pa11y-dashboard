/**
 * @file clean.js - Clean directory with Gulp task
 * @author Alex Clapperton <hi@alexclapperton.co.uk>
 */

import del from 'del';
import { argv, data } from '../gulpfile.babel';

function clean(cb) {
  console.log(argv.prod);

  if (!argv.prod) {
    return del([data.paths.dist.base]);
  }

  cb();
}

export default clean;
