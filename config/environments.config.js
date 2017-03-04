// Here is where you can define configuration overrides based on the execution
// environment. Supply a key to the default export matching the NODE_ENV that
// you wish to target, and the base configuration will apply your overrides
// before exporting itself.

module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: (config) => {
    config.globals['__CONFIG__'] = JSON.stringify({
      web: `http://${config.server_host}:${config.server_port}/`,
      api: {}
    })

    return config
  },

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: (config) => {
    config.globals['__CONFIG__'] = JSON.stringify({
      web: '//www.xxx.com/',
      api: {}
    })

    config.compiler_public_path = '/'
    config.compiler_fail_on_warning = false
    config.compiler_hash_type = 'chunkhash'
    config.compiler_devtool = false
    config.compiler_stats = {
      chunks: true,
      chunkModules: true,
      colors: true
    }
    config.server_hot_reload = false

    return config
  }
}
