import browserSync from 'browser-sync'

let imagesTask = (gulp, plugins, config) => {
  return gulp.src(config.images.src)
    .pipe(plugins.changed(config.images.dest))
    .pipe(plugins.if(!config.development, plugins.imagemin()))
    .pipe(gulp.dest(config.images.dest))
    .pipe(browserSync.stream())
}

export default imagesTask
