import routers from './routers'

import ApplicationLayoutView from './views/Common/ApplicationLayoutView'

import HeaderView from './views/Common/HeaderView'

const MuchitoAmor = Marionette.Application.extend({

  region: '#app',

  onBeforeStart () {
    this.Routers = routers()
  },

  onStart () {
    this.showView(new ApplicationLayoutView())
    // TODO: Render footer
    const headerView = new HeaderView()
    Radio.channel('app').trigger('render:region', 'header', headerView)

    Backbone.history.start({
      root: '/',
      pushState: true
    })
  }

})

export default MuchitoAmor
