const _ = require('lodash');
const ApiErrorCodes = require('./ApiErrorCodes')
/**
 * Base API errors
 */
const baseErrorDefs = Object.freeze(ApiErrorCodes);

// holds base erro functions
let BASE_ERRORS = null;

/**
 * @class
 * API Error class.
 */
module.exports = class ApiError extends Error {
    /**
     * Constructor
     * @param {string} message error message
     */
    constructor(message, status, code) {
        super(message);
        this._status = status;
        this._code = code;
    }

    /**
     * Base error functions.
     * @type {object}
     */
    static get baseErrors() {
        if (BASE_ERRORS === null) {
            BASE_ERRORS = ApiError.extendErrors({});
        }
        return BASE_ERRORS;
    }

    /**
     * HTTP status code
     * @type {number}
     */
    get status() {
        return this._status;
    }

    /**
     * API error code
     * @type {string}
     */
    get code() {
        return this._code;
    }

    /**
     * Create extended error functions for given error definition object.
     * @param {{status:number,message:string}} errDef error definition object.
     */
    static extendErrors(errDef) {
        const errors = _.defaults(errDef || {}, baseErrorDefs);
        return _.mapValues(errors, (val, key) => {
            return (message) => new ApiError(message || val.message, val.status, key);
        });
    }
};
