/** Third party dependencies and libarries */
const JWT = require("jsonwebtoken");



/** Local dependencies and libaries */
const { apiFailedResponse } = require("../helper");



/** Application configurations and declarations */
const {
    JWT_SECRET_KEY: secret
} = process.env;


const User = require('../models/User')

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        JWT.verify(token, secret, async (err, user) => {
            if (err) {
                return res.status(200).send(apiFailedResponse('Forbidden', { err }, {}, 409));
            }

            if (user.iss !== process.env.ISSUER)
                return res
                    .status(200)
                    .send(
                        apiFailedResponse(
                            'Unauthorized',
                            {},
                            {},
                            401
                        )
                    );

            const user_data = await User.findOne({
                _id: user.user.id
            });

            if (user_data == null) {
                return res.status(200).send(apiFailedResponse('Unauthorized', {}, {}, 401));
            }

            Object.assign(
                req,
                {
                    user: user_data,
                    token,
                }
            )
            

            next();

        });
    } else {
        return res.status(200).send(apiFailedResponse('Unauthorized', {}, {}, 401));
    }
};

module.exports = {
    authenticateJWT
};