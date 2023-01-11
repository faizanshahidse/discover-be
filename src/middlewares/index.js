const verifyToken = require('./verifytoken');

const schemaValidator = require('./schemaValidator');


module.exports = {
    ...verifyToken,
    ...schemaValidator,
}