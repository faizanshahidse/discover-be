/** Third party dependencies*/
const { Router } = require('express');


/** Local dependencies and functions */
const {
} = require('./discover.controller');

const {
    verifyToken,
    schemaValidator,
    isSystem,
    uploadMiddleware,
} = require('../../middlewares');


const router = Router();

router
    .post(
        '/',
        schemaValidator('aggregationStartPayload'),
        createAggregation
    )
    .get(
        '/',
        schemaValidator('aggregationRetreivalPayload'),
        getAggregatedData
    );

module.exports = {
    router,
};
