import browserSync from 'browser-sync'
import historyFallback from 'connect-history-api-fallback'

let browserSyncTask = (gulp, plugins, config) => {
  browserSync.init({
    server: {
      baseDir: config.paths.dest,
      middleware: [ historyFallback() ]
    },
    open: false,
    notify: false,
    xip: true,
    port: config.browsersync.port,
    ui: {
      port: config.browsersync.uiport
    }
  })
}

export default browserSyncTask
