const _ = require('lodash');

/**
 * Encapsulates Azure response
 */
module.exports = class AzureResponse {
    /**
     * Constructor
     * @param {context} context
     */
    constructor(context) {
        this._status = 200;
        this._headers = {};
        this._context = context;
        this._sent = false;
    }

    /**
     * Get response status code
     * @type {number}
     */
    get status() {
        return this._status;
    }

    /**
     * Set response status code
     * @param {number} val status code
     */
    set status(val) {
        this._status = _.toInteger(val);
    }

    /**
     * Get response headers
     * @type {object}
     */
    get headers() {
        return this._headers;
    }

    /**
     * Get header value for key
     * @param {string} key header key
     * @param {string} defVal default value
     */
    getHeader(key, defVal) {
        return _.get(this.headers, key, _.get(this.headers, _.lowerCase(key), defVal));
    }

    /**
     * Set headers
     * @param {object} val headers
     */
    set headers(val) {
        this._headers = _.assign({}, val);
    }

    /**
     * Set header for key
     * @param {string} key header key
     * @param {string} val header value
     */
    setHeader(key, val) {
        _.set(this._headers, key, val);
    }

    /**
     * True if response has been sent
     * @type {boolean}
     */
    get isSent() {
        return this._sent;
    }

    /**
     * Send given value as response. Response can be sent only once.
     * @param {*} val response data
     */
    sendRaw(val) {
        if (this._sent) {
            throw new Error('Response already sent');
        }
        this._context.res = {
            headers:this.headers,
            status: this._status,
            body:val
        }
        this._sent = true;
    }

    /**
     * Send JSON response.
     * @param {*} val response data
     */
    send(val) {
        this.setHeader('Content-Type', 'application/json');
        const body = _.isObject(val) ? val : { 'response': val };
        this.sendRaw(JSON.stringify(body));
    }
};
