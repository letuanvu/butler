const _ = require('lodash');

const ApiAuthenticate = (req, res, next) => {
    const api_key = _.get(req.headers, 'x-api-key', undefined);
    if (!!process.env.API_KEY) {
        if (api_key != process.env.API_KEY) {
            return res.status(400).send('Not authorized! Go back!');
        }
    }
    next();
}

module.exports = ApiAuthenticate;
