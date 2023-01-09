'use strict';

/**  Third party dependencies and libraries */
const express = require('express');

const cors = require('cors');

const listEndpoints = require("express-list-endpoints");

const Sentry = require('@sentry/node');

const morgan = require('morgan');

const compress = require('compression');

const nocache = require('nocache');




/** Local dependencies and libraries*/
const {
  AppConfig,
} = require('./config');



/** Application configurations, environments and declarations */
const {
  API_ENDPOINT,
  API_BASE,
  SENTRY_DSN,
  MODULE,
  SENTRY_ENVIRONMENT,
} = process.env;


const {
  VERSION: version
} = require('../package.json');


// Initializing Sentry
const sentryIntializer = {
  dsn: SENTRY_DSN,
  initialScope: {
    tags: {
      myTag: MODULE,
    },
  },
  environment: SENTRY_ENVIRONMENT,
}

Sentry.init(sentryIntializer);

// Express Application main router
const app = express();




/** Setting up routers and middlewares */
app.use(cors());

app.use(
  express.static('./public')
);

app.use(compress());

app.use(nocache());


//Setting up body-parser package for parsing form data
app.use(
  express.urlencoded({
    extended: true,
  }),
);

//Setting up json data parser
app.use(express.json());

app.get('/api-endpoints', function (req, res) {
  const routes = listEndpoints(app);
  let endpoints = [];
  for (const route of routes) {
    endpoints.push({
      uri: route.path,
      method: route.methods[0]
    });
  }
  let data = {
    version: VERSION,
    data: {
      apiBase: API_ENDPOINT,
      appName: MODULE,
      endpoints
    }
  }
  res.json(data);
});

// Development logging
if (process.env.NODE_ENV == AppConfig.environments.list.DEVLOCAL)
  app.use(morgan('dev'));


/** Local configuration exports & modules */
const {
  router,
  rootRouter,
} = require('./routes');



// mount all routes on /api path
app.use(API_BASE, router);
app.use('/', rootRouter);


//Serving app
app.use(async function (err, req, res, next) {
  try {
    if (err.message !== 'Validation errors' && process.env.NODE_ENV == 'development') {
      Sentry.captureException(
        err,
        Sentry
          .getCurrentHub()
          .getScope()
      );

      await Sentry.flush();
    }

    const statusCode = res.statusCode === 200 ? err.status_code || 500 : res.statusCode;

    res
      .status(statusCode)
      .json({
        response: false,
        name: err.name,
        status_code: err.status_code || statusCode,
        status: err.status || 'fail',
        message: err.message,
        error_msgs: err.data,
        data: err.error_msgs,
        isOperational: err.isOperational,
        stack: process.env.NODE_ENV === 'development' ? null : err.stack,
      });

    next();
  } catch (exc) {
    res
      .status(500)
      .send('server-error');

    console.log(exc);
  }
});

module.exports = {
  app,
}