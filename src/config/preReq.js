/** Third party dependencies */
const Bluebird = require('bluebird'); // eslint-disable-line no-global-assign



// Initializing DB connection by importing the DB module, if not initialized
require('./database');




/**
 * Pre requisite functions and configuration for application / web-server
 * @property {*} app - Express App
 * @property {*} config - Configuration object for applications
 * @returns {Promise<void>}
 */
module.exports = async (app, config = {}) => {
    try {
        /** Global available definition for root
     * Though a bad practice, but boiler plate strategy for testing.
     */
        global['root'] = __dirname

        /**
         * Replacing promise by Bluebird
         */
        Object.assign(
            Promise.prototype,
            Bluebird
        );

        return app;
    } catch (exc) {
        console.log(exc);
    }
}