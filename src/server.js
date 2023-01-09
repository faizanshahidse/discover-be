/** Third party dependencies. */
const express = require('express');

const serverlesshttp = require('serverless-http');




/** Local statics. environment and configuration */

const {
    AppConfig
} = require('./config');



module.exports = async () => {

    /** Application instance */
    const { app } = require('./app');


    if (process.env.NODE_ENV === AppConfig.environments.list.DEVLOCAL)
        return { app };


    return {
        app,
        servelessInstance: serverlesshttp(app)
    }
}

