import browserSync from 'browser-sync'

let cacheBustTask = (gulp, plugins, config) => {
  return gulp.src(config.html.cachebust)
    .pipe(plugins.cacheBust())
    .pipe(gulp.dest(config.html.dest))
    .pipe(browserSync.stream())
}

export default cacheBustTask
