/** Local dependencies and objects */
const {
    newsListing: retrieveNewsListing,
} = require('../news/news.service');


const {
    matchesListing: retrieveMatchesListing,
} = require('../matches/matches.service');
const { response } = require('express');



/** Service to compile / build a listing for stream discover feed */
const buildStream = async () => {

}



/**
 * Service to return a listing for stream discover feed
 * @param {Object} query
 * @param {Object} options
 * @returns {Promise<Array<*>>}
 */
const streamListing = async (query, options) => {
    const [
        { newsListing, newsMeta },
        matchesListing,
    ] = await Promise.all([
        retrieveNewsListing(query, options),
        retrieveMatchesListing(options),
    ]);


    const responseToBuild = [];

    /** Iteration counters */
    const iterations = {
        news: 0,
        matches: 0,
    }


    for (let index in newsListing) {
        /** 
         * @description Business logic for every 6th element to matches
         * @note REMOVE: Hardcoded startegy - kindly bear with - this is for rapid delivery for PoC purposes
         */
        index = +index;

        const seventhElementFactor = (index + 1) % 7;

        let document;
        let type;

        const isSeventhElementAfterFirst = index && !seventhElementFactor;


        /** Resetting matches iterations if News counts is larger */
        if (!matchesListing[iterations.matches])
            iterations.matches = 0;

        document = isSeventhElementAfterFirst
            ? matchesListing[iterations.matches++]
            : newsListing[iterations.news++];

        type = isSeventhElementAfterFirst
            ? 'match'
            : 'news';


        const { id } = document;

        responseToBuild.push({
            type,
            document,
            id,
        });
    }


    return {
        streamData: responseToBuild,
        ...newsMeta,
    };
}


module.exports = {
    streamListing,
}