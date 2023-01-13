const AWS = require('aws-sdk');
require('dotenv').config();
const {
  ACCESS_KEY,
  SECRET_KEY,
  REGION,
  S3_BUCKET,
} = process.env;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});


const get = (key) => {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    let params = { Bucket: S3_BUCKET, Key: key };
    
    return s3.getObject(params, function (err, data) {
      if (err && err.code === 'NoSuchKey')
        resolve(undefined);

      if (err && err.code !== 'NoSuchKey')
        console.log(err);

      resolve(data);
    });
  });
}

module.exports = {
  get
}