/** Third party dependencies */
const mongoose = require("mongoose");



/** Organizational dependencies and packages */
const dbConnection = require('feed_media_433/config/database');



/** Application configuration and declarations */
let db = dbConnection || null;

const {
  MONGOOSE_DEBUG = 'false',
  MONGO_DB_HOST,
} = process.env;



const connection = () => {
  try {
    mongoose.set(
      "debug",
      JSON.parse(process.env.MONGOOSE_DEBUG)
    );

    if (db === null) {
      db = mongoose.createConnection(MONGO_DB_HOST, {
        minPoolSize: 0,
        maxPoolSize: 1,
        keepAlive: true,
        connectTimeoutMS: 10000,
        serverSelectionTimeoutMS: 10000,
        maxIdleTimeMS: 10000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      db.on("connected", () => {
        console.log("Mongo connection is up for Discover Module - main cluster.");
      });

      db.on("error", (err) => {
        console.error("Unable to connect to the mongo db:", err);
      });
    }

    return db;
  } catch (err) {
    console.log("Unable to connect to the mongo db:", err);
    return err;
  }
};



module.exports = connection();
