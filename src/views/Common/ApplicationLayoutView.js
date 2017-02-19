const ApplicationLayoutView = Marionette.View.extend({

  el: '#app',

  template: require('./templates/ApplicationLayoutView.hbs'),

  regions: {
    header: '.app--header',
    content: '.app--content',
    footer: '.app--footer'
  },

  initialize () {
    const radioChannel = Radio.channel('app')
    this.listenTo(radioChannel, 'render:region', this.onRenderRegion)
  },

  onRenderRegion (region, view) {
    console.log(arguments)
    App.rootView.getRegion(region).show(view)
  }

})

export default ApplicationLayoutView
