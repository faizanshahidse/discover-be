/** Third party dependencies. */
const express = require('express');

const serverlesshttp = require('serverless-http');




/** Local statics. environment and configuration */

const {
    AppConfig
} = require('./config');

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

