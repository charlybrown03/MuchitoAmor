let eslintTask = (gulp, plugins, config) => {
  return gulp.src(config.scripts.glob)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
}

export default eslintTask
