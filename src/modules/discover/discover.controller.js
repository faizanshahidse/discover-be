/** Local dependencies and libraries */
const {
    discoverListing,
} = require('./discover.service');

const {
    apiSuccessResponse,
} = require('../../helper');



const discoverListingController = async (req, res, next) => {
    try {
        const {
            query
        } = req;

        const loadedListing = await discoverListing(query);

        const responseToSend = apiSuccessResponse(loadedListing);

        res.send(responseToSend);
    } catch (exc) {
        next(exc);
    }
}


module.exports = {
    discoverListingController,
}