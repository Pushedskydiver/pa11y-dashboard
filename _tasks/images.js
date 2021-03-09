/**
 * @file images.js - Optimise images for better performance
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import { dest, src } from 'gulp';
import plugins from 'gulp-load-plugins';
import { data } from '../gulpfile.babel';

const $ = plugins();

export function images() {
  return src(data.paths.source.images)
    .pipe($.imagemin(data.plugin.imgmin))
    .pipe(dest(data.paths.dist.images));
}
