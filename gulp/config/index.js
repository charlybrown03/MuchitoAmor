import dotenv from 'dotenv'

dotenv.config({ silent: true })

let isDevelopment = (process.env.ENV && process.env.ENV !== 'production')

let config = {

  environment: isDevelopment ? 'development' : 'production',
  development: isDevelopment,

  browsersync: {
    port: 9000,
    uiport: 9001
  },

  browserify: {
    app: 'main.js',
    vendor: 'vendor.js'
  },

  // fonts: {
  //   src: [
  //     'src/resources/fonts/**/*',
  //     'node_modules/font-awesome/fonts/**/*'
  //   ],
  //   dest: 'public/fonts'
  // },

  gzip: {
    src: 'public/**/*.{html,xml,json,css,js,js.map,css.map}',
    dest: 'public/',
    options: {}
  },

  html: {
    src: 'src/**/*.html',
    dest: 'public',
    cachebust: 'public/**/*.html'
  },

  images: {
    src: 'src/resources/images/**/*',
    dest: 'public/img'
  },

  sass: {
    src: 'src/resources/styles',
    dest: 'public/css',
    glob: 'src/resources/styles/**/*.scss',
    includePaths: [
      'node_modules/normalize-scss/sass',
      'node_modules'
    ]
  },

  scripts: {
    src: 'src',
    dest: 'public/js',
    glob: 'src/**/*.js'
  },

  paths: {
    src: 'src',
    dest: 'public'
  }

}

export default config
