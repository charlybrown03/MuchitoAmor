import browserSync from 'browser-sync'

import errorHandler from '../utils/errorHandler'

let sassTask = (gulp, plugins, config) => {
  return gulp.src(config.sass.glob)
    .pipe(plugins.if(config.development, plugins.sourcemaps.init()))
    .pipe(plugins.sassGlob())
    .pipe(plugins.sass({
      sourceComments: config.development,
      outputStyle: config.development ? 'nested' : 'compressed',
      includePaths: config.sass.includePaths
    }))
    .on('error', errorHandler)
    .pipe(plugins.autoprefixer({
      browsers: [ 'last 2 versions', '> 1%', 'ie 8' ]
    }))
    .pipe(plugins.if(config.development, plugins.sourcemaps.write('./')))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream())
}

export default sassTask
