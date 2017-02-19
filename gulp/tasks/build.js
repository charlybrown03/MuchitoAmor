import runSequence from 'run-sequence'

let buildTask = (gulp, plugins, config, done) => {
  runSequence([
    // 'copy:fonts',
    'copy:images',
    'copy:html',
    'sass'
  ], [
    'browserify:vendor',
    'browserify:app'
  ], done)
}

export default buildTask
