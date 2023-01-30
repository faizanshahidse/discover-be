/** Local dependencies and libraries */
const {
    MicroserviceBridges,
} = require('../../adapters');



/** Application configuration and declarations */
const {
    AppConfig: {
        microservices
    }
} = require('../../config');



/** Application configuration and declarations */
const {
    HomeMediaBridge,
} = MicroserviceBridges;

const homemediaBridge = new HomeMediaBridge();

const {
    homemedia: {
        features: {
            news: {
                listings: { path: newsListingsPath }
            }
        }
    }
} = microservices;

const { SECURE } = process.env;




const newsListing = async (query, options) => {
    const {
        microservice: { endpoint }
    } = homemediaBridge;

    const { authorized } = options;

    const uri = new URL(endpoint);


    /** Integrated logic to complete query for News microservice */
    // Adding in required from attribute
    if (!query.from)
        query.from = 0;


    for (let attribute in query) {
        const value = query[attribute];

        uri.searchParams.append(attribute, value);
    }

    uri.pathname = newsListingsPath;

    const newsResponse = await homemediaBridge.getHttp({
        url: uri.toString(),
        authorized,
        secure: SECURE == 'true'
    });


    /** Transforming data according to Discover stream requirements */
    const {
        data: {
            records: newsListing = [],
            ...newsMeta
        }
    } = newsResponse;

    return { newsListing, newsMeta };
}


module.exports = {
    newsListing,
}