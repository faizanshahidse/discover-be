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
    MatchesBridge,
} = MicroserviceBridges;

const matchesBridge = new MatchesBridge();

const {
    matches: {
        features: {
            events: {
                details: { path: detailsListingPath }
            }
        }
    }
} = microservices;




const matchesListing = async (options) => {
    const {
        microservice: { endpoint }
    } = matchesBridge;

    const { authorized } = options;

    let uri = new URL(endpoint);


    /**
     * @description TE-515
     * @note - REMOVE: HARDCODED FOR POC
     */
    const query = {
        tz: 'Asia/Karachi',
    };

    const matchIds = [
        '6331aa7d70848493285d0f53', '6331aa7d70848493285d0e8b', '62e396aec47a131b855c1c99', '6331aa6570848493285cf696', '62e396abc47a131b855c1b5d', '62e396adc47a131b855c1c37', '6331aa7f70848493285d10e4', '62e396c7c47a131b855c3b57', '62e396abc47a131b855c1b57', '6351c57decf782a43243a43f', '63566c3dfe32a3e8d234b2d6', '634243d97ef373ae2069c259', '62e396b7c47a131b855c25b3', '62e396adc47a131b855c1c5f', '62e396b3c47a131b855c214f', '62e396b0c47a131b855c1ee1', '62e396acc47a131b855c1bc7', '63507504ecf782a43229729a', '62e396aec47a131b855c1c9b', '62e396adc47a131b855c1c51', '6331aa7f70848493285d10e1', '62e396acc47a131b855c1b81', '6331aa7f70848493285d10b7', '63531686f61bb7c1fbeeb293', '635da5bad8ddbb97e77af0f9', '62e396abc47a131b855c1b61', '6331aa7f70848493285d1096', '62e396b4c47a131b855c2277', '62e396aec47a131b855c1d2d', '63571aaba4074b61f6a074c1', '6331aa7d70848493285d0e94', '6331aa7f70848493285d1081', '62e396adc47a131b855c1c75', '62e396b1c47a131b855c1f31', '62e396adc47a131b855c1c3b', '62e396acc47a131b855c1b8f', '6331aa7f70848493285d10c3', '62e396acc47a131b855c1bcd'
    ];

    uri.pathname = detailsListingPath;

    uri = uri
        .toString()
        .concat('?');


    for (let matchId of matchIds) {
        uri += `match_id=${matchId}&`;
    }


    const listing = await matchesBridge.getHttp({
        url: uri.toString(),
        authorized,
        secure: false,
    })

    return listing;
}


module.exports = {
    matchesListing,
}