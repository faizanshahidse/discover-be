/** Third party dependencies */
const express = require('express');



/** System Routers for different modules */
const router = express.Router(); // eslint-disable-line new-cap

const rootRouter = express.Router(); // eslint-disable-line new-cap

const { router: StreamRouter } = require('../modules/stream/stream.routes');



/**
 * Handler for route not found - 404
 * @param {Object} forcedOptions
 * @param {String} forcedOptions.source
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
const routeNotFoundHandler = (forcedOptions = {}, req, res, next) => {
    const { source = 'root' } = forcedOptions;

    res
        .status(404)
        .send({ message: 'routenotfound', source })
}

const healthCheckHandler = (req, res, next) => {
    res.send(200);
}


/** GET /health-check - zzzCheck service health */
router
    .get(
        '/health-check',
        healthCheckHandler
    );



/** Discover APIs router */
// Stream router
router
    .use(
        '/stream',
        StreamRouter,
    );



router
    .all(
        '*',
        routeNotFoundHandler
            .bind(null, { parentRouter: 'app' })
    );


/** Root router */
rootRouter
    .get(
        '/',
        healthCheckHandler,
    );

rootRouter
    .get(
        '/health-check',
        healthCheckHandler,
    );

rootRouter
    .all(
        '*',
        routeNotFoundHandler
            .bind(null, { parentRouter: 'root' })
    );

module.exports = {
    router,
    rootRouter,
};
