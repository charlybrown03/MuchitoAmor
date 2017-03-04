(function () {
  var methodMap = {
    'create': 'POST',
    'update': 'PATCH',
    'patch': 'PATCH',
    'delete': 'DELETE',
    'read': 'GET'
  }

  Backbone.sync = function (method, model, options) {
    var type = methodMap[method]

    _.defaults(options || (options = {}))

    var params = { type: type, dataType: 'json' }

    if (!options.url) {
      params.url = _.result(model, 'url') || urlError()
    }

    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/x-www-form-urlencoded'
      params.data = model.toJSON(options)
    }

    var error = options.error
    options.error = function (xhr, textStatus, errorThrown) {
      options.textStatus = textStatus
      options.errorThrown = errorThrown
      if (error) error.call(options.context, xhr, textStatus, errorThrown)
    }

    var xhr = options.xhr = Backbone.ajax(_.extend(params, options))
    model.trigger('request', model, xhr, options)
    return xhr
  }
}).call(this)
