const jwt = require('jwt-simple');
const moment = require('moment');

const User = require('./models').User;
const config = require('./config');

module.exports = (req, res, next) => {
    let token = req.body.access_token || req.query.access_token || req.headers['x-access-token'];

    if(!token)
        return res.status(401).json({
            code: 0,
            message: 'No Access Token'
        });

    let payload;

    try {
        payload = jwt.decode(token, config.secret);
    } catch(err) {
        return res.status(401).json({
            code: 0,
            message: 'Invalid Access Token'
        });
    }

    if(moment(payload.expires) <= moment(Date.now()))
        return res.status(401).json({
            code: 0,
            message: 'Token expired'
        });

    User.findById(payload.uid)
    .then(user => {
        if(!user)
            return res.status(401).json({
                code: 0,
                message: 'You are not autherized'
            });
        req.body.user = user;
        next();
    })
   
}
