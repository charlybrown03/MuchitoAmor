const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const project = require('./project.config')

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
    }]
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
    new CopyWebpackPlugin([
      {
        context: project.paths.public(),
        from: {
          glob: '**/*',
          dot: true
        },
        to: project.paths.dist()
      }
    ])
  ],

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
webpackConfig.plugins.push(
  new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: false,
    allChunks: true
  })
)

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
    new webpack.optimize.AggressiveMergingPlugin()
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
