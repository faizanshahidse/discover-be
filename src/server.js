/** Third party dependencies. */
const express = require('express');

const serverlesshttp = require('serverless-http');



/** Initializing Organization packages */
const HomeMedia = require('feed_media_433');



/** Local dependencies and libraries */
const { RedisClients } = require('./libraries')



/** Local configuration and declarations */
// Initializing models via HomeMedia
require('feed_media_433/models');

// Initializng Redis OM Clients
new RedisClients.StreamOM();



/** Local statics. environment and configuration */
const {
    IS_SERVERLESS_ENABLED = false,
} = process.env;



module.exports = async () => {

    /** Application instance */
    const { app } = require('./app');


    if (!JSON.parse(IS_SERVERLESS_ENABLED))
        return { app };


    return {
        app,
        servelessInstance: serverlesshttp(app)
    }
}

