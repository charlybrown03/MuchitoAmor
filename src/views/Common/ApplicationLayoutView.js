import ApplicationLayoutTemplate from './templates/ApplicationLayoutView.hbs'

const ApplicationLayoutView = Marionette.View.extend({

  template: ApplicationLayoutTemplate,

  regions: {
    header: '.app--header',
    content: '.app--content',
    footer: '.app--footer'
  },

  initialize (options) {
    const radioChannel = Radio.channel('app')
    this.listenTo(radioChannel, 'render:region', this.onRenderRegion)
  },

  onRenderRegion (region, view) {
    const App = this.getOption('App')
    App.getView().getRegion(region).show(view)
  }

})

export default ApplicationLayoutView
