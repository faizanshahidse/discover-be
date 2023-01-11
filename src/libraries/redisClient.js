/** Core dependencies */
const { promisify } = require("util");



/** Third party dependencies */
const { Entity, Schema, Repository } = require('redis-om');



/** Third party dependencies */
const { createClient } = require('redis');

const { Client } = require('redis-om');



/** Local imports and statics */
const {
    errorMessages,
} = require('../imports');



/** Local declarations and configurations 
 * @note importing directly to evade circular dependency and undefined / empty objects being imported
*/
const AppConfig = require('../config/appConfig');



/** Application declarations and configurations **/
const { microservices } = AppConfig;



const redisErrorHandler = (error) => {
    console.log('[redis] REDIS ERROR:');
    console.log(error);
}


class RedisOM {
    microservice;

    static instance = null;

    redisClient = null;

    client = null;

    clientName = '';

    repository = null;

    /**
     * @param {string} useClient - Microservice or client name / id
     * @returns {Promise<import('redis-om').Client>}
     */
    constructor(useClient) {

        /** Checking if feature or service is even enabled */
        const microserviceLabel = useClient.toLowerCase();

        this.microservice = microservices[microserviceLabel];

        if (!this.microservice)
            throw new Error(errorMessages.Applicaton.RedisModuleMissing.message);


        // Extracting connection information from environment variables
        const host = process.env[`REDIS_HOST_${useClient}`];

        const username = process.env[`REDIS_USERNAME_${useClient}`];

        const password = process.env[`REDIS_PASSWORD_${useClient}`];

        const port = process.env[`REDIS_PORT_${useClient}`];

        const database = process.env[`REDIS_DBNO_${useClient}`];


        // Initializing Redis client
        this.clientName = useClient;

        const url = `redis://${username}:${password}@${host}:${port}`;

        this.redisClient = createClient({
            url,
            database,
        });


        // Setting Redis client handles
        this.redisClient.on('error', redisErrorHandler);

        this.redisClient.on('disconnect', console.log.bind(this, `[redis] -- REDIS ${useClient} disconnected --`));

        this.redisClient.on('disconnected', console.log.bind(this, `[redis] -- REDIS ${useClient} disconnected --`));

        this.redisClient
            .connect()
            .then(
                console.log
                    .bind(this, `[redis] -- REDIS ${useClient} connected --`)
            )
            .catch(console.error);


        // Configruing RedisOM client with initialized Redis Client
        this.client = new Client()
            .use(this.redisClient);
    }

    async initializeInstance() {
        return await this.client;
    }

    async closeConnection() {
        await this.instance.close();

        console.log(`[redis]-- REDIS ${this.clientName} disconnected --`);
    }
}

/** Stream OM Assets */
class Stream extends Entity {
}

class StreamOM extends RedisOM {
    static instance;

    static schema;

    static repository;

    /** We are going to be following a Singleton Design pattern
     * for the OM communicating with Redis
     */
    constructor() {
        const thisClient = super('STREAM');

        (async () => {
            const client = await thisClient.initializeInstance();

            /** Intiializing Static attributes for singleton instance */
            const instance = client;

            const schema = new Schema(Stream, {});

            const repository = instance.fetchRepository(schema);

            Object.assign(
                StreamOM,
                {
                    instance,
                    schema,
                    repository,
                }
            )
        })();
    }
}


module.exports = {
    RedisOM,
    StreamOM,
}