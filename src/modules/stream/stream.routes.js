/** Third party dependencies*/
const { Router } = require('express');


/** Local dependencies and functions */
const {
    streamListingController,
} = require('./stream.controller');

const {
    verifyToken,
    schemaValidator,
} = require('../../middlewares');


const router = Router();


router
    .get(
        '/',
        verifyToken,
        schemaValidator('streamQuery'),
        streamListingController,
    )


module.exports = {
    router,
};
