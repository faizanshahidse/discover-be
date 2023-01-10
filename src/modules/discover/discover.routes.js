/** Third party dependencies*/
const { Router } = require('express');


/** Local dependencies and functions */
const {
    discoverListingController,
} = require('./discover.controller');

const {
    verifyToken,
    schemaValidator,
} = require('../../middlewares');


const router = Router();


router
    .get(
        '/',
        verifyToken,
        discoverListingController,
    )


module.exports = {
    router,
};
