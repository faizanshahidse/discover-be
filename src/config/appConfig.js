/** Third party dependencies */
const _ = require("lodash");



/** Application declarations and configurations */
const {
    HOMEMEDIA_ENDPOINT,
    MATCHES_ENDPOINT,
} = process.env;


/** Application runtime configuration driven by engineering as well as product */
const Environments = {
    list: {
        DEVLOCAL: "devlocal",
        PREDEV: "predev",
        DEVELOPMENT: "dev",
        STAGING: "staging",
        PRODUCTION: "production",
    },
    get exceptLocalDev() {
        return _.omit(this.list, ["DEVLOCAL"]);
    },
    get exceptLocalDevKeys() {
        return [
            ...Object
                .values(
                    this.exceptLocalDev
                )
        ]
    },
};



/** Microservice modules */
const microservices = {
    homemedia: {
        endpoint: HOMEMEDIA_ENDPOINT,
        features: {
            news: {
                listings: { path: '/v2/news', }
            },
        }
    },
    matches: {
        endpoint: MATCHES_ENDPOINT,
        features: {
            events: {
                details: { path: '/api/matches/matches-details' }
            },
        }
    },
    stream: {},
}



const httpRules = {
    allowedAuthorizations: {
        types: {
            Bearer: 'bearer',
        },
        get list() {
            return Object.values(this.allowedAuthorizations.types);
        }
    },
    successCodes: {
        minimum: 0,
        maximum: 299,
    }
}


const AppConfig = {
    environments: Environments,
    microservices,
    httpRules,
}



module.exports = AppConfig;