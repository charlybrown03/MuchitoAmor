var webpackConfig = require('./webpack.build.config')

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: '../test/**/*.js', watched: false }
    ],
    frameworks: [ 'jasmine' ],
    preprocessors: {
      '../test/**/*.js': [ 'webpack', 'sourcemap' ]
    },
    reporters: [ 'mocha', 'junit' ],
    junitReporter: {
      outputDir: '../',
      outputFile: 'karma-results.xml',
      useBrowserName: false
    },
    singleRun: true,
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins,
      module: webpackConfig.module
    },
    webpackMiddleware: {
      stats: {
        colors: true
      },
      quiet: true
    }
  })
}
