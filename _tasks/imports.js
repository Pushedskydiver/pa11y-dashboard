/**
 * @file imports.js - Generate SASS imports automatically
 * @author Alex Clapperton <alex.clapperton@codecomputerlove.com>
 */

import plugins from 'gulp-load-plugins'

const $ = plugins()

const creds = {
  "Author": 	"Alex Clapperton",
  "Website": 	"alexclapperton.co.uk"
}

module.exports = (gulp, data) => {
  gulp.task('imports:sass', () => {
      return gulp.src([
        data.paths.sass.settings,
        data.paths.sass.tools.functions,
        data.paths.sass.tools.props,
        data.paths.sass.tools.mixins,
        data.paths.sass.generic,
        data.paths.sass.elements,
        data.paths.sass.objects,
        data.paths.sass.components,
        data.paths.sass.trumps
      ])
      .pipe($.sassGenerateContents(`${data.paths.source.styles}main.scss`, creds))
      .pipe(gulp.dest(data.paths.source.styles));
  });
}
