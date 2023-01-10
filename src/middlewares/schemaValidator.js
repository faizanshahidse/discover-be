/** Local dependencies and libraries */
const validators = require('../validators');

const inBodyParameters = ['POST', 'PUT'];

const inQueryParameters = ['GET'];

const schemaValidatorPicker = async (validatorName, req, res, next) => {
    try {
        const { method, body, query } = req;

        const validatorToUse = validators[validatorName];

        const parametersToUse = inBodyParameters.includes(method)
            ? body
            : query;

        const isValid = await validatorToUse(parametersToUse);

        Object.assign(
            req.headers,
            { isValidRequestFor: validatorName }
        )

        next();
    } catch (err) {
        const useError = err.name || 'error-occured';

        const { Error: { error, status } } = new ErrorsFactory({ message: useError });

        response(res, error, status);

        console.log(e);

        next(e);
    }

}

const schemaValidator = (validatorName) => schemaValidatorPicker.bind(null, validatorName);

module.exports = {
    schemaValidator
}