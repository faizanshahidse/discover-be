/** Local dependencies and objects */
const {
    newsListing,
} = require('../news/news.service');



/**
 * Service to compile a listing for discover social media feed
 * @param {Object} request
 * @param {Object} response
 * @param {Object} next
 * @returns {Array<*>}
 */
const discoverListing = async (request, response, next) => {
    const newsListingData = await newsListing(request, response, next);

    return newsListingData;
}


module.exports = {
    discoverListing,
}