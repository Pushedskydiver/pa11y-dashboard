/**
 * @file copy.js - Copy assets to public with Gulp task
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

module.exports = (gulp, data) => {
  gulp.task('copy:favicons', () => {
      return gulp.src(`${data.paths.source.favicons}**/*`)
          .pipe(gulp.dest(data.paths.dist.favicons))
  });

  gulp.task('copy:manifest', () => {
      return gulp.src('./_config/site.webmanifest')
          .pipe(gulp.dest(data.paths.dist.base))
  });

  gulp.task('copy:fonts', () => {
      return gulp.src(data.paths.source.fonts)
          .pipe(gulp.dest(data.paths.dist.fonts))
  });

  // gulp.task('copy:serviceWorker', () => {
  //     return gulp.src(`${data.paths.source.base}sw.js`)
  //         .pipe(gulp.dest(data.paths.dist.base))
  // });
}
