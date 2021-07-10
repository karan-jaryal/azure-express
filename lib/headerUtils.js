const _ = require('lodash');
const objUtils = require('./objUtils');
const headerFormat = require('header-case-normalizer');

/**
 * Get value for a given header key, allowing for case mismatches
 * @param {object} headers headers object
 * @param {string} key header key
 * @param {string} defaultVal default value
 * @return {string} header value
 */
module.exports.getValue = function (headers, key, defaultVal) {
    // same key lookup
    key = _.toString(key);
    if (_.has(headers, key)) {
        return headers[key];
    }

    // lower case lookup
    const lowerKey = key.toLowerCase();
    if (_.has(headers, lowerKey)) {
        return headers[lowerKey];
    }

    // normalized lookup
    const normKey = headerFormat(key);
    if (_.has(headers, normKey)) {
        return headers[normKey];
    }

    // default value
    return defaultVal;
};

/**
 * Parse ";" delimited, key=value parameters, from a header value.
 * @param {string} headerValue header value
 * @returns {object} params object
 */
module.exports.getValueParams = function (headerValue) {
    return _.split(headerValue, ';')
        .map((p) => _.split(p, '=').map(_.trim))
        .filter((p) => p.length === 2)
        .reduce((m, p) => {
            m[p[0]] = p[1];
            return m;
        }, {});
};

/**
 * Get Date value for a given header key
 * @param {object} headers headers object
 * @param {string} key header key
 * @param {Date} defaultVal default date value
 * @return {Date} Date value
 */
module.exports.getValueDate = function (headers, key, defaultVal) {
    // get value
    const val = module.exports.getValue(headers, key);

    const date = objUtils.toDate(val);

    // parse as date, or default value
    if (_.isDate(date)) {
        return date;
    } else {
        return defaultVal;
    }
};
