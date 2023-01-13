const { get } = require ('../utils');

const getURL = async (fileName, folder) => {
    const url = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${folder}/${fileName}`;
    return url;
}

const getImageFromS3 = async (fileName, folder) => {
    const key = folder + '/' + fileName;
    const image = await get(key);
    if (image) {
      return await getURL(fileName, folder);
    } else {
      return null;
    }
}

  module.exports = {
    getURL,
    getImageFromS3
  }