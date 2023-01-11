/** Third party dependencies */
const httpStatus = require('http-status');



/** Local dependencies and libraries */
const validators = require('../validators');



/** Application declarations and configurations */
const inBodyParameters = ['POST', 'PUT'];

const inQueryParameters = ['GET'];



/**
 * Schema Validator middleware
 * @param {String} validatorName 
 * @param {import('express').Request} req Express Request object
 * @param {import('express').Response} res Express Response object
 * @param {import('express').NextFunction} next Express Next Function
 * @returns {Promise<*>}
 */
const schemaValidatorPicker = async (validatorName, req, res, next) => {
    try {
        const { method, body, query } = req;

        const validatorToUse = validators[validatorName];

        const parametersToUse = inBodyParameters
            .includes(method)
            ? body
            : query;

        const isValid = await validatorToUse(parametersToUse);

        Object.assign(
            req.headers,
            { isValidRequestFor: validatorName }
        )

        next();
    } catch (err) {
       err.status_code = httpStatus.BAD_REQUEST;
       
       next(err);
    }

}

const schemaValidator = (validatorName) => schemaValidatorPicker.bind(null, validatorName);

module.exports = {
    schemaValidator
}