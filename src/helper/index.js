const Common = require('./common');
const S3 = require('./awsS3');



module.exports = {
    ...Common,
    ...S3
}