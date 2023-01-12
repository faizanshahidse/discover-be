/** Third party dependencies and libarries */
const JWT = require("jsonwebtoken");

const httpStatus = require('http-status');



/** Local dependencies and libaries */
const { apiFailedResponse } = require("../helper");



/** Application configurations and declarations */
const {
    JWT_SECRET_KEY: secret
} = process.env;


const {
    UserRead,
} = require('../models/User');


console.log(require('../models'))



const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        JWT.verify(token, secret, async (err, userData) => {
            if (err) {
                return res
                    .status(httpStatus.CONFLICT)
                    .send(apiFailedResponse({
                        ...err,
                        status_code: httpStatus.CONFLICT
                    }));
            }


            if (userData.iss !== process.env.ISSUER) {
                return res
                    .status(200)
                    .send(
                        apiFailedResponse({
                            ...err,
                            status_code: httpStatus.UNAUTHORIZED
                        })
                    );
            }

            const {
                user: { id }
            } = userData;

            const user_data = await UserRead.findOne({
                id,
                deleted: false,
            });

            if (user_data == null) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .send(
                        apiFailedResponse({
                            ...err,
                            status_code: httpStatus.AUTHORIZED
                        })
                    );
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
        return res
            .status(httpStatus.UNAUTHORIZED)
            .send(apiFailedResponse('Unauthorized', {}, {}, httpStatus.UNAUTHORIZED));
    }
};

module.exports = {
    verifyToken,
};