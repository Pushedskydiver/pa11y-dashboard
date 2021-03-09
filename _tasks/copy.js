/**
 * @file copy.js - Copy assets to public with Gulp task
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import { dest, src } from 'gulp';
import { data } from '../gulpfile.babel';

function copy(source, destination) {
  return src(source)
    .pipe(dest(destination))
}

export function copyFavicons() {
  const src = `${data.paths.source.favicons}**/*`;
  const dest = data.paths.dist.favicons;

  return copy(src, dest);
}

export function copyManifest() {
  const src = './_config/site.webmanifest';
  const dest = data.paths.dist.base;

  return copy(src, dest);
}

export function copyFonts() {
  const src = data.paths.source.fonts;
  const dest = data.paths.dist.fonts;

  return copy(src, dest);
}
