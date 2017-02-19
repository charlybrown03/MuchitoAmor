import browserSync from 'browser-sync'

let htmlTask = (gulp, plugins, config) => {
  return gulp.src(config.html.src)
    .pipe(plugins.changed(config.html.dest))
    .pipe(gulp.dest(config.html.dest))
    .pipe(browserSync.stream())
}

export default htmlTask
