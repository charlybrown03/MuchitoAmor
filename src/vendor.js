window.jQuery = window.$ = require('jquery')
window._ = require('lodash')
window.Tether = require('tether')

window.Backbone = require('backbone')
window.Backbone.$ = window.$
window.Marionette = require('backbone.marionette')
window.Radio = require('backbone.radio')

window.$.ajaxSetup({
  cache: false
})

require('backbone.routefilter')

require('bootstrap')
