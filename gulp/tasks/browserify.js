import browserify from 'browserify'

import babelify from 'babelify'
import envify from 'envify'
import hbsfy from 'hbsfy'
import watchify from 'watchify'

import browserSync from 'browser-sync'
import buffer from 'vinyl-buffer'
import source from 'vinyl-source-stream'

import errorHandler from '../utils/errorHandler'
import bundleLogger from '../utils/bundleLogger'

let browserifyTask = (gulp, plugins, config, file, done) => {
  let bundler = browserify({
    entries: [ `${config.scripts.src}/${file}` ],
    debug: config.development
  })

  if (config.development) {
    bundler = watchify(bundler)
    bundler.on('update', rebundle)
  }

  const transforms = [
    { name: babelify, options: {} },
    { name: hbsfy, options: {} },
    { name: envify, options: {} }
  ]

  transforms.forEach(transform => {
    bundler.transform(transform.name, transform.options)
  })

  function rebundle () {
    bundleLogger.start(file)
    const stream = bundler.bundle()

    return stream
      .on('error', errorHandler.bind(this))
      .on('end', bundleLogger.end.bind(this, file))
      .pipe(source(file))
      .pipe(plugins.if(config.development, buffer()))
      .pipe(plugins.if(config.development, plugins.sourcemaps.init({ loadMaps: true })))
      .pipe(plugins.if(!config.development, plugins.streamify(plugins.uglify({
        compress: { drop_console: true }
      }))))
      .pipe(plugins.if(config.development, plugins.sourcemaps.write('./')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(browserSync.stream())
  }

  return rebundle()
}

export default browserifyTask
