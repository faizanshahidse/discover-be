/** Local dependencies and libraries */
const {
    streamListing,
} = require('./stream.service');

const {
    apiSuccessResponse,
} = require('../../helper');



const streamListingController = async (req, res, next) => {
    try {
        const {
            query,
            token,
        } = req;

        const options = {
            authorized: {
                type: 'bearer',
                token: token,
            }
        }

        const loadedListing = await streamListing(query, options);

        const responseToSend = apiSuccessResponse(loadedListing);

        res.send(responseToSend);
    } catch (exc) {
        next(exc);
    }
}


module.exports = {
    streamListingController,
}