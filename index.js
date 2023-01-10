/** Asynchronous Application flow */
const instantiate = async (...args) => {
    /** Setting off Express Application Handling App */


    /** Third party dependencies */
    const dotenv = require('dotenv');



    /** Environment configuration */
    dotenv.config();



    /** Local dependencies and libnraries */
    const serverIntializer = require('./src/server');


    /** Application configuration and declarations */
    const {
        app,
        servelessInstance,
    } = await serverIntializer();

    /** Application declarations and configurations */
    const {
        APP_PORT,
        PORT,
    } = process.env;


    /** Application prerequisite startup functions & Config integration */
    const { PreReq: preReq, AppConfig } = require('./src/config');    /** Application Statics */

    const appConfig = require('./src/config');

    await preReq(app, appConfig);



    if (!servelessInstance) {
        app.listen(PORT, () => {
            console.log(`Express server running on port ${PORT}`);
        });

        return app;
    }

    return servelessInstance(...args);
};

// module.exports.handler = instantiate;
instantiate()