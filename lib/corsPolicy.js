/**
 * Headers allowed in requests, as per API CORS policy.
 */
const ALLOW_HEADERS = ['Content-Type', 'Authorization', 'Content-Length',
    'Date', 'ETag', 'If-Not-Match', 'If-Modified-Since', 'x-api-key'];

/**
 * Headers exposed in responses, as per API CORS policy.
 */
const EXPOSE_HEADERS = ['Content-Type', 'Authorization', 'Content-Length',
    'Date', 'ETag', 'Cache-Control', 'Location', 'Last-Modified', 'x-api-key'];

// also add headers remapped by API Gateway
const remapped = EXPOSE_HEADERS.map(h => `x-amzn-remapped-${h.toLowerCase()}`);
EXPOSE_HEADERS.push(...remapped);

/**
 * Allowed request origins, as per CORS policy.
 */
const ALLOW_ORIGIN = ['*'];

/**
 * Allowed request methods, as per CORS policy.
 */
const ALLOW_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'];

/**
 * CORS policy
 */
module.exports = {
    'ALLOW_ORIGIN': ALLOW_ORIGIN.join(','),
    'ALLOW_METHODS': ALLOW_METHODS.join(','),
    'ALLOW_HEADERS': ALLOW_HEADERS.join(','),
    'ALLOW_HEADERS_ARRAY': ALLOW_HEADERS,
    'EXPOSE_HEADERS': EXPOSE_HEADERS.join(',')
};
