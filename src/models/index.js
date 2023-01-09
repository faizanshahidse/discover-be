/** Third party dependencies */
const fs = require('fs');

const path = require('path');



/** Application configuration and declarations */
const basename = path.basename(__filename);

const db = {}

fs
    .readdirSync(__dirname)
    .filter(file => (
        file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (
            file
                .split('.')
                .pop() === '.js'
        )
    )
    .forEach(file => {
        const modelPath = path.join(__dirname, file);

        const model = require(path.join(__dirname, file));

        const splitting = modelPath.split("\\");

        const modelName = splitting[splitting.length - 1].split(".")[0];

        db[modelName] = model;
    });

    

module.exports = db;