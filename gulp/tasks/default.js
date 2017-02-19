import runSequence from 'run-sequence'

let defaultTask = (gulp, plugins, config, done) => {
  plugins.util.log(`${plugins.util.colors.yellow('Starting', config.environment, 'build!')}`)
  runSequence(`${config.environment}`, done)
}

export default defaultTask
