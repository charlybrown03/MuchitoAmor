import gulp from 'gulp'

import fs from 'fs'

import gulpPlugins from 'gulp-load-plugins'
import config from './config/'

// Import gulp tasks
let tasks = []
let plugins = gulpPlugins()

let wrap = function (task, ...done) {
  return task.bind(this, gulp, plugins, config, ...done)
}

fs.readdirSync(`${process.cwd()}/gulp/tasks/`).forEach(task => {
  let taskName = task.replace('.js', '')
  tasks[taskName] = require('./tasks/' + task).default
})

// Task assignment
gulp.task('browserify:app', wrap(tasks.browserify, config.browserify.app))
gulp.task('browserify:vendor', wrap(tasks.browserify, config.browserify.vendor))
gulp.task('browsersync', wrap(tasks.browsersync))
gulp.task('build', [ 'clean' ], wrap(tasks.build))
gulp.task('cachebust', wrap(tasks.cachebust))
gulp.task('clean', wrap(tasks.clean))
// gulp.task('copy:fonts', wrap(tasks.fonts))
gulp.task('copy:html', wrap(tasks.html))
gulp.task('copy:images', wrap(tasks.images))
gulp.task('default', wrap(tasks.default))
gulp.task('development', [ 'build' ], wrap(tasks.development))
gulp.task('eslint', wrap(tasks.eslint))
gulp.task('gzip', wrap(tasks.gzip))
gulp.task('production', [ 'build' ], wrap(tasks.production))
gulp.task('sass', wrap(tasks.sass))
gulp.task('watch', [ 'browsersync' ], wrap(tasks.watch))
