const corsPolicy = require('./corsPolicy');

/**
 * Async middleware for adding CORS headers to response.
 * @param {LambdaRequest} req request
 * @param {LambdaResponse} res response
 */
module.exports = async function corsHeaders(req, res) {
    // add CORS headers
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Origin', req.getHeader('Origin', corsPolicy.ALLOW_ORIGIN));
    res.setHeader('Access-Control-Allow-Methods', corsPolicy.ALLOW_METHODS);
    res.setHeader('Access-Control-Allow-Headers', corsPolicy.ALLOW_HEADERS);
    res.setHeader('Access-Control-Expose-Headers', corsPolicy.EXPOSE_HEADERS);
};
