const ApiError = require('./ApiError');

/**
 * Async middleware for handling API errors.
 * @param {Error} err error
 * @param {Function Request} req request
 * @param {Function Response} res response
 */
module.exports = async function errorHandler(err, req, res) {
    // log and convert to API error
    if (!(err instanceof ApiError)) {
        req.context.log(err);
        err = ApiError.baseErrors.INTERNAL();
    }

    // send API error JSON
    if (!res.isSent) {
        res.status = err.status;
        res.send({
            code: err.code,
            message: err.message
        });
    }
};
