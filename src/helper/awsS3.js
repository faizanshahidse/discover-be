/** Local dependencies and libraries */
const { get } = require('../utils');



/** Application configuration & declarations */
const {
  S3_BUCKET,
} = process.env;


/** Generates an S3 Endpoint for a resource
 * @description TE-516
 * @note Might be hardcoded
 * 
 * @param {string} fileName Name of file
 * @param {string} folder Bucket folder name
 * 
 * @returns {string} S3 Endpoint
 */
const getURL = async (fileName, folder) => {
  const url = `https://${S3_BUCKET}.s3.amazonaws.com/${folder}/${fileName}`;
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