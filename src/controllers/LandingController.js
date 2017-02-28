import MainView from '../views/Common/MainView'

const LandingController = Marionette.Object.extend({

  showLanding () {
    // const model = ...
    const view = new MainView()
    Radio.channel('app').trigger('render:region', 'content', view)
  }

})

export default LandingController
