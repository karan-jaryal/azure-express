const _ = require('lodash');
const ApiError = require('./ApiError');

// HTTP methods with body
const METHODS = ['POST', 'PUT', 'PATCH'];

/**
 * Async middleware for parsing request body.
 * @param {LambdaRequest} req request
 * @param {LambdaResponse} res response
 */
module.exports = async function bodyparser(req, res) {
    if (_.includes(METHODS, req.method) && req.contentType === 'application/json') {
        try {
            req.body = JSON.parse(req.rawBody);
        } catch (err) {
            throw ApiError.baseErrors.INVALID_INPUT(err.message);
        }
    }
};