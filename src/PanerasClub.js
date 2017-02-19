import routers from './routers'

import ApplicationLayoutView from './views/Common/ApplicationLayoutView'
import HeaderView from './views/Common/HeaderView'

const PanerasClub = Marionette.Application.extend({

  onBeforeStart () {
    this.Routers = routers()
  },

  onStart () {
    this.rootView = new ApplicationLayoutView().render()
    // TODO - Render Header and Footer
    const headerView = new HeaderView()
    Radio.channel('app').trigger('render:region', 'header', headerView)

    Backbone.history.start({
      root: '/',
      pushState: true
    })
  }

})

export default PanerasClub
