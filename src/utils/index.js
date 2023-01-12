const HttpRequest = require('./httpsRequest');
const S3 = require('./awsS3');



module.exports = {
    ...HttpRequest,
    ...S3
}