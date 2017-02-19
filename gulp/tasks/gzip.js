let gzipTask = (gulp, plugins, config) => {
  return gulp.src(config.gzip.src)
    .pipe(plugins.gzip(config.gzip.options))
    .pipe(gulp.dest(config.gzip.dest))
}

export default gzipTask
