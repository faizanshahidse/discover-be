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

const { getURL, getImageFromS3 } = require('../../helper')




const matchesListing = async (query, options) => {
    const {
        microservice: { endpoint }
    } = matchesBridge;

    const { authorized } = options;
    const {tz, top_favourite_teams } = query;

    let uri = new URL(endpoint);


    /**
     * @description TE-515
     */

    uri.pathname = detailsListingPath;
    uri.searchParams.set('tz', tz);
    uri.searchParams.set('top_favourite_teams', top_favourite_teams);

    uri = uri.toString();

    console.log('uri...', uri);

    // Retrieving Matches Listing
    let matchesResponse = await matchesBridge
        .getHttp({
            url: uri.toString(),
            authorized,
        });


    let { data: matchesListing = [], } = matchesResponse;


    // Retrieving images for Clubs for a specific league
    matchesListing = await Promise.all(
        matchesListing
            .map(async match => {
                const { tournament_templateFK: leagueId } = match;

                const clubImage = await getLeagueBackgroundImage(leagueId);

                Object.assign(
                    match,
                    { clubImage },
                )

                return match;
            })
    )

    return matchesListing ;
}



const getLeagueBackgroundImage = async (league_id) => {
    const leagueFileName = `background/${league_id}.jpg`;
    const folder = 'league';

    let background_image = await getImageFromS3(leagueFileName, folder);

    if (!background_image) {
        const defaultFileName = 'background/generic.jpg';
        background_image = await getURL(defaultFileName, folder)
    }

    return background_image;
}


module.exports = {
    matchesListing,
    getLeagueBackgroundImage
}