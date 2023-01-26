/** Third party dependencies */
const joi = require('joi')



/** Application configuration and declarations */
const errorMessages = {
}



/**
 * Stream GET QUery validator function
 * @param {Object} data 
 * @param {string} [data.excludeId] Exclusion id for pagination - Id of last document
 * @param {numeber} data.limit - Pagination limit
 */
const streamQuery = async (data) => {
    const streamValidator = joi.object({
        // limit: joi.string().required(),
        // from: joi.string().required(),
        tz: joi.string().required(),
        top_favourite_teams: joi.string().required()
    });

    const { error, ...rest } = await streamValidator.validate(data);

    if (error)
        throw new Error(error.message);

    return rest;
}


module.exports = {
    streamQuery,
}