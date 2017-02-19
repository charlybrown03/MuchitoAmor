import gutil from 'gulp-util'
import prettyHrtime from 'pretty-hrtime'

let startTime

let bundleLogger = {

  start (file) {
    startTime = process.hrtime()
    gutil.log(`Starting ${gutil.colors.green('Bundling', file)}...`)
  },

  end (file) {
    const taskTime = process.hrtime(startTime)
    const prettyTime = prettyHrtime(taskTime)
    gutil.log(`Finished ${gutil.colors.yellow('bundling of', file)} in ${gutil.colors.magenta(prettyTime)}`)
  }
}

export default bundleLogger
