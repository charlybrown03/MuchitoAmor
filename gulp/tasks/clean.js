import del from 'del'

let cleanTask = (gulp, plugins, config) => {
  return del.sync(`${config.paths.dest}/**/*`)
}

export default cleanTask
