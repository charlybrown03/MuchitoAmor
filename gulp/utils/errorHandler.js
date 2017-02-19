import gutil from 'gulp-util'
import config from '../config'

let errorHandler = function (error) {
  gutil.log(gutil.colors.red(error))

  if (config.development) {
    this.emit('end')
    return
  }

  process.exit(1)
}

export default errorHandler
