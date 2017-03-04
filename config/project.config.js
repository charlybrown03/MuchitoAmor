const path = require('path')

// ========================================================
// Default Configuration
// ========================================================
const config = {
  env: process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base: path.resolve(__dirname, '..'),
  dir_client: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
  dir_test: 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host: '0.0.0.0',
  server_port: process.env.PORT || 9000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_babel: {
    cacheDirectory: true,
    plugins: [],
    presets: [ 'es2015', 'stage-2' ]
  },
  compiler_devtool: 'source-map',
  compiler_hash_type: 'hash',
  compiler_fail_on_warning: false,
  compiler_quiet: false,
  compiler_public_path: '/',
  compiler_stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compiler_vendors: [
    'jquery',
    'lodash',
    'tether',
    'backbone',
    'backbone.radio',
    'backbone.marionette',
    'color-hash'
  ],

  // ----------------------------------
  // Test Configuration
  // ----------------------------------
  coverage_reporters: [
    {
      type: 'text-summary'
    },
    {
      type: 'lcov',
      dir: 'coverage'
    }
  ]
}

/************************************************
-------------------------------------------------
All Internal Configuration Below
Edit at Your Own Risk
-------------------------------------------------
************************************************/

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env)
  },
  'NODE_ENV': config.env,
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__COVERAGE__': config.env === 'test',
  '__BASENAME__': JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Validate Vendor Dependencies
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true

    console.log(
      `Package "${dep}" was not found as an npm dependency in package.json; ` +
      `it won't be included in the webpack vendor bundle.
       Consider removing it from \`compiler_vendors\` in ~/config/index.js`
    )
  })

// ------------------------------------
// Utilities
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  src: base.bind(null, config.dir_client),
  public: base.bind(null, config.dir_public),
  dist: base.bind(null, config.dir_dist)
}

// ========================================================
// Environment Configuration
// ========================================================
const environments = require('./environments.config')
const overrides = environments[config.env]
if (overrides) {
  Object.assign(config, overrides(config))
}

module.exports = config
