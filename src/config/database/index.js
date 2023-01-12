/** Third party packages */
const mongoose = require("mongoose");

const dotenv = require('dotenv');


/** Application configuration and declarations */

dotenv.config();

const {
    MONGO_DB: MONGO_DB_CORE,
    MONGO_DB_AUTOREADNEAREST,
    MONGO_DB_AUTOREADSECONDARY,
    MONGO_DB_READ1,
    MONGO_DB_READ2,
    MONGO_DB_WRITE,
    MONGO_DB_CORESECONDARYPREFERRED,
    MONGO_DB_COREPRIMARYPREFERREDWMAJORITY,
    MONGO_DB_COREPRIMARYPREFERREDW1,
    MONGO_DB_COREPRIMARYPREFERREDW0,
    MONGOOSE_DEBUG,
} = process.env;


const connectionStrings = {
    MONGO_DB: MONGO_DB_CORE,
    MONGO_DB_AUTOREADNEAREST,
    MONGO_DB_AUTOREADSECONDARY,
    MONGO_DB_READ1,
    MONGO_DB_READ2,
    MONGO_DB_WRITE,
    MONGO_DB_CORESECONDARYPREFERRED,
    MONGO_DB_COREPRIMARYPREFERREDWMAJORITY,
    MONGO_DB_COREPRIMARYPREFERREDW1,
    MONGO_DB_COREPRIMARYPREFERREDW0,
    MONGOOSE_DEBUG,
}

let connection = {
};

const connectionNames = [
    'coresecondarypreferred',
    'coreprimarypreferredw1',
    // 'coreprimarypreferredwmajority',
];

mongoose.set('debug', JSON.parse(MONGOOSE_DEBUG));




for (let name of connectionNames) {
    const uppercaseName = name.toUpperCase();

    const useConnectionName = `connection_${uppercaseName}`;

    if (!connection[useConnectionName]) {

        const connectionString = connectionStrings[`MONGO_DB_${uppercaseName}`] ||
            connectionStrings[`MONGO_DB_AUTO_${uppercaseName}`];


        connection[useConnectionName] = mongoose.createConnection(
            connectionString,
            {
                maxPoolSize: 1,
                minPoolSize: 0,
                maxIdleTimeMS: 10000,
                connectTimeoutMS: 10000,
                serverSelectionTimeoutMS: 10000,
                serverSelectionTimeoutMS: 0,
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const connectionSet = connection[useConnectionName];

        connectionSet.on('connected', console.log.bind(this, `DB CONNECTED via ${uppercaseName}`));

        connectionSet.on('error', (err) => {
            console.log(`DB ERROR via ${uppercaseName}`);
            console.log(err);
        });

        connectionSet.on('disconnected', console.log.bind(this, `DB DISCONNECTED from ${uppercaseName}`));
    }
}

module.exports = connection;