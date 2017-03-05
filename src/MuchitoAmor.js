import routers from './routers'

import ApplicationLayoutView from './views/Common/ApplicationLayoutView'
import HeaderView from './views/Common/HeaderView'

const MuchitoAmor = Marionette.Application.extend({

  region: '#app',

  onBeforeStart () {
    this.Routers = routers()
  },

  onStart () {
    this.showView(new ApplicationLayoutView({ App: this }))
    // TODO: Render footer
    const headerView = new HeaderView()
    Radio.channel('app').trigger('render:region', 'header', headerView)

    Backbone.history.start({
      root: '/',
      pushState: true
    })
  },

  navigate: function (url, options) {
    const defaults = {
      trigger: true
    }

    options = _.extend(defaults, options || {})
    Backbone.history.navigate(url, options)
  }

})

export default MuchitoAmor
