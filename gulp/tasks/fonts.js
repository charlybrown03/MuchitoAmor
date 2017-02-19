import browserSync from 'browser-sync'

let fontsTask = (gulp, plugins, config) => {
  return gulp.src(config.fonts.src)
    .pipe(plugins.changed(config.fonts.dest))
    .pipe(gulp.dest(config.fonts.dest))
    .pipe(browserSync.stream())
}

export default fontsTask
