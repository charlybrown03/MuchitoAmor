import runSequence from 'run-sequence'

let productionTask = (gulp, plugins, config, done) => {
  runSequence('gzip', 'cachebust', done)
}

export default productionTask
