import bodyParser from 'body-parser'
import compress from 'compression'
import consolidate from 'consolidate'
import cookieParser from 'cookie-parser'
import express from 'express'
import flash from 'connect-flash'
import helmet from 'helmet'
import methodOverride from 'method-override'
import morgan from 'morgan'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import nunjucks from 'nunjucks'
import passport from 'passport'
import path from 'path'
import session from 'express-session'

import apiRoutes from '../app/routes/api.server.routes'
import config from './config'
import getErrorMessage from '../app/lib/error-messages'
import '../app/models'
import seed from '../app/lib/seed'

const mongoStore = connectMongo({session})

module.exports = function() {
  const app = express()

  // call with true or delete db to seed
  seed(process.env.NODE_ENV, false)

  // // Passing the request url and title to environment locals
  // app.use(function(req, res, next) {
  //   res.locals.url = req.protocol + '://' + req.headers.host + req.url;
  //   res.locals.title = config.app.title;
  //   next();
  // });

  // Should be placed before express.static
  app.use(compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'))
    },
    level: 9
  }))

  // Showing stack errors
  app.set('showStackError', true)

  // Set nunjucks as the template engine
  app.engine('server.view.html', consolidate[config.templateEngine])

  // add filter from swig for backwards compatibility
  var env = nunjucks.configure('./app/views', {
    autoescape: false,
    express: app
  })

  env.addFilter('json', function(input, indent) {
    return JSON.stringify(input, null, indent || 0)
  })

  // // // Set views path and view engine
  app.set('view engine', 'server.view.html')
  app.set('views', './app/views')

  // Environment dependent middleware
  if (process.env.NODE_ENV === 'development') {
    // Enable logger (morgan)
    app.use(morgan('dev'))

    // Disable views cache
    app.set('view cache', false)
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory'
  }

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(methodOverride())

  // CookieParser should be above session
  app.use(cookieParser())

  // Express MongoDB session storage
  app.use(session({
    saveUninitialized: false,
    resave: true,
    secret: config.sessionSecret,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      collection: config.sessionCollection
    })
  }))

  // use passport session
  app.use(passport.initialize())
  app.use(passport.session())

  // connect flash for flash messages
  app.use(flash())

  // Use helmet to secure Express headers
  app.use(helmet())
  app.disable('x-powered-by')

  // Use api routes
  app.use('/api', apiRoutes())

  // Setting the app router and static folder
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('./public/dist')))
  }

  // Error handler
  app.use(function(err, req, res, next) {
    if (!err) return next()

    // Dont log during testing
    if (process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.error(err.stack)
    }

    const error = getErrorMessage(err)
    res.status(error.status).json({
      message: error.message
    })
  })

  // Assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).json({
      message: 'Not found'
    })
  })

  // Return Express server instance
  return app
}
