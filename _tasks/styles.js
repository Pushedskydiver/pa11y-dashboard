/**
 * @file styles.js - Styles related Gulp tasks
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import autoprefixer from 'autoprefixer'
import devtools from 'postcss-devtools'
import focus from 'postcss-focus'
import cssnano from 'cssnano'
import mqpacker from 'css-mqpacker'
import cleanselectors from 'postcss-minify-selectors'
import plugins from 'gulp-load-plugins'

const $ = plugins()

module.exports = (gulp, data, argv) => {
  const getPostCssPlugins = () => {
    const postCssPlugins = [
      devtools(),
      focus(),
      cleanselectors(),
      autoprefixer(data.plugin.autoprefixer),
      mqpacker(data.plugin.mqpacker),
      cssnano(data.plugin.cssnano)
    ]

    if (argv.prod) {
      postCssPlugins.push(cssnano({
        core: true
      }))
    }

    return postCssPlugins
  }

  gulp.task('styles:sass', () => {
      return gulp.src(`${data.paths.source.styles}*.scss`)
          .pipe($.sourcemaps.init())
          .pipe($.sass({outputStyle: 'expanded'}).on('error', $.sass.logError))
          .pipe($.postcss(getPostCssPlugins()))
          .pipe($.if(argv.prod, $.cleanCss()))
          .pipe($.sourcemaps.write('sourcemaps'))
          .pipe(gulp.dest(data.paths.dist.styles));
  });
}
