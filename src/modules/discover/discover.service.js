/** Local dependencies and objects */
const {
    newsListing,
} = require('../news/news.service');



/**
 * Service to compile a listing for discover social media feed
 * @param {Object} query
 * @returns {Promise<Array<*>>}
 */
const discoverListing = async (query) => {
    const newsListingData = await newsListing(query);

    return newsListingData;
}


module.exports = {
    discoverListing,
}