let watchTask = (gulp, plugins, config) => {
  // gulp.watch(config.fonts.src, [ 'copy:fonts' ])
  gulp.watch(config.html.src, [ 'copy:html' ])
  gulp.watch(config.images.src, [ 'copy:images' ])
  gulp.watch(config.sass.glob, [ 'sass' ])
  // gulp.watch(config.scripts.glob, [ 'eslint' ])
}

export default watchTask
