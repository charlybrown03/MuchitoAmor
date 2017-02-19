import runSequence from 'run-sequence'

let developmentTask = (gulp, plugins, config, done) => {
  runSequence('watch')
}

export default developmentTask
