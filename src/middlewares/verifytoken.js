const JWT = require("jsonwebtoken");
const { apiFailedResponse } = require("../helper");
const secret = process.env.JWT_SECRET_KEY
const User = require('../models/User')

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        JWT.verify(token, secret, async (err, user) => {
            if (err) {
                return res.status(200).send(apiFailedResponse('Forbidden', {err}, {}, 409));
            }
            
            if (user.iss == process.env.ISSUER) {
                
                const user_data = await User.findOne({
                    _id: user.user.id
                })
                if(user_data == null){
                    return res.status(200).send(apiFailedResponse('Unauthorized', {}, {}, 401));    
                }

                req.user = {user: user_data};
                req.token = token;
                next();
            } else {
                return res.status(200).send(apiFailedResponse('Unauthorized', {}, {}, 401));
            }

        });
    } else {
        return res.status(200).send(apiFailedResponse('Unauthorized', {}, {}, 401));
    }
};

module.exports = authenticateJWT;