const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const project = require('./project.config')

const __DEV__ = project.globals.__DEV__
const __STAGING__ = project.globals.__STAGING__
const __QA__ = project.globals.__QA__
const __PROD__ = project.globals.__PROD__
const __TEST__ = project.globals.__TEST__

const entryJs = project.paths.src('main.js')
const vendorEntryJs = project.paths.src('vendor.js')

const webpackConfig = {
  entry: {
    app: [ entryJs ],
    vendor: [ vendorEntryJs ]
  },

  output: {
    filename: `[name].[${project.compiler_hash_type}].js`,
    path: project.paths.dist(),
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader'
      ]
    }, {
      test: /\.json$/,
      use: [
        'json-loader'
      ]
    }, {
      test: /\.hbs$/,
      use: [
        {
          loader: 'handlebars-loader',
          query: {
            helperDirs: [
              project.paths.src('helpers/handlebars')
            ]
          }
        }
      ]
    }, {
      test: /datatables\.net.*/,
      use: [
        {
          loader: 'imports-loader?define=>false'
        }
      ]
    }]
  },

  resolve: {
    modules: [ project.paths.src(), 'node_modules' ],
    extensions: [ '.js', '.json' ],
    alias: {
      'jquery-ui/core': 'jquery-ui/ui/core.js',
      'jquery-ui/widget': 'jquery-ui/ui/widget.js',
      'jquery-ui/draggable': 'jquery-ui/ui/widgets/draggable.js',
      'jquery-ui/mouse': 'jquery-ui/ui/widgets/mouse.js',
      'jquery-ui/resizable': 'jquery-ui/ui/widgets/resizable.js',
      'underscore': 'lodash'
    }
  },

  plugins: [
    new webpack.DefinePlugin(project.globals),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'Backbone.$': 'jquery',
      'Marionette': 'backbone.marionette',
      'moment': 'moment',
      'Radio': 'backbone.radio',
      'Tether': 'tether',
      'window._': 'lodash',
      'window.$': 'jquery',
      'window.Backbone': 'backbone',
      'window.Cookies': 'js-cookie',
      'window.Highlight': 'highlight.js',
      'window.Marionette': 'backbone.marionette',
      'window.moment': 'moment',
      'window.Radio': 'backbone.radio',
      'window.Tether': 'tether'
    }),
    new HtmlWebpackPlugin({
      template: project.paths.src('index.html'),
      hash: false,
      favicon: project.paths.public('img/themediaplayers.png'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new DashboardPlugin()
  ],

  devServer: {
    hot: project.server_hot_reload,
    contentBase: project.paths.public(),
    clientLogLevel: 'none',
    historyApiFallback: true,
    host: project.server_host,
    port: project.server_port,
    stats: project.compiler_stats
  },

  devtool: project.compiler_devtool,

  stats: project.compiler_stats
}

//
// Stylesheets
//
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      cssnano({
        autoprefixer: {
          add: true,
          remove: true,
          browsers: ['last 2 versions']
        },
        discardComments: {
          removeAll: true
        },
        discardUnused: false,
        mergeIdents: false,
        reduceIdents: false,
        safe: true,
        sourcemap: true
      })
    ]
  }
}

const sassLoader = {
  loader: 'sass-loader',
  query: {
    sourceMap: __PROD__ ? 'compressed' : 'expanded'
  }
}

const scssProdLoaders = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader',
    postcssLoader,
    'resolve-url-loader',
    'sass-loader'
  ]
})

const cssProdLoaders = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    'css-loader',
    postcssLoader,
    'resolve-url-loader'
  ]
})

const scssDevLoaders = [
  'style-loader',
  'css-loader',
  postcssLoader,
  'resolve-url-loader',
  sassLoader
]

const cssDevLoaders = [
  'style-loader',
  'css-loader',
  postcssLoader,
  'resolve-url-loader'
]

webpackConfig.module.rules.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  use: !__PROD__ ? scssDevLoaders : scssProdLoaders
}, {
  test: /\.css$/,
  exclude: /node_modules/,
  use: !__PROD__ ? cssDevLoaders : cssProdLoaders
})

//
// Font files
//
webpackConfig.module.rules.push(
  {
    test: /\.(woff|woff2|otf|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: `file-loader`
  },
  {
    test: /\.(png|jpg|svg|ico)$/,
    loader: `file-loader`
  }
)

//
// Environment specific
//
if (__DEV__ || __STAGING__ || __QA__) {
  const host = project.server_host
  const port = project.server_port
  webpackConfig.entry.app.unshift(
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server'
  )

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}

if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      comments: false
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: false,
      allChunks: true
    })
  )
}

if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor' ]
    })
  )
}

module.exports = webpackConfig
