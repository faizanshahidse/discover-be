/** Third party dependencies */
const joi = require('joi');

const { isValidTimeZone } = require('../../utils/common');



/** Application configuration and declarations */
const errorMessages = {
}



/**
 * Stream GET QUery validator function
 * @param {Object} data 
 * @param {string} [data.excludeId] Exclusion id for pagination - Id of last document
 * @param {numeber} data.limit - Pagination limit
 * @param {numeber} data.from - Pagination from
 * @param {numeber} data.top_favourite_teams
 * @param {string} data.tz
 */
const streamQuery = async (data) => {

    /** parse params into numbers */
    data.from = data.from && parseInt(data.from);
    data.limit = data.limit && parseInt(data.limit);
    data.top_favourite_teams = data.top_favourite_teams && parseInt(data.top_favourite_teams);


    const streamValidator = joi.object({
        limit: joi.number().required(),
        from: joi.number().required(),
        tz: joi.string().required().custom((value, helper) => {
            if(isValidTimeZone(value)) return true;
            else return helper.message('invalid timezone param');
        }),
        top_favourite_teams: joi.number().required().min(1)
    });

    const { error, ...rest } = await streamValidator.validate(data);

    if (error)
        throw new Error(error.message);

    return rest;
}


module.exports = {
    streamQuery,
}