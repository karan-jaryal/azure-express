const _ = require('lodash');
const headerUtils = require('./headerUtils');
const headerFormat = require('header-case-normalizer');

/**
 * Encapsulates API request for Azure function.
 */
module.exports = class AzureRequest {
    /**
     * Constructor.
     * @param {object} context azure function context
     * @param {object} meta handler metadata
     */
    constructor(context, req) {
        this._context = context;
        this._req = req;
        this._body = this.body;
        this._session = {};
        this._locals = {};
        this.rawBody = req.rawBody;
        this._headers = _.mapKeys(req.headers, (v, k) => headerFormat(k));
    }


    /**
     * Get azure function context.
     * @type {object}
     */
    get context() {
        return this._context;
    }

    /**
     * Get handler metadata.
     * @type {object}
     */
    get meta() {
        return this._meta;
    }

    /**
     * Get headers.
     * @type {object}
     */
    get headers() {
        return this._headers || {};
    }

    /**
     * Get content type header value
     * @type {string}
     */
    get contentType() {
        return this.getHeader('Content-Type');
    }

    /**
     * Get API request method
     * @type {string}
     */
    get method() {
        return _.upperCase(this._req.method);
    }

    /**
     * Get API request path.
     * @type {string}
     */
    get path() {
        return this._req.path;
    }

    /**
     * Get url path parameters
     * @type {object}
     */
    get pathParams() {
        return this._req.params || {};
    }

    /**
     * Get query parameters.
     * @type {object}
     */
    get query() {
        return this._req.query || {};
    }

    /**
     * Get request body
     * @type {object}
     */
    get body() {
        return this._body;
    }

    /**
     * Set request body
     * @param {object} val body
     */
    set body(val) {
        this._body = val;
    }

    /**
     * Get session object
     * @type {object}
     */
    get session() {
        return this._session;
    }

    /**
     * Get local data object
     * @type {object}
     */
    get locals() {
        return this._locals;
    }

    /**
     * Get header for key
     * @param {string} key header key
     * @param {string} defVal default value
     */
    getHeader(key, defVal) {
        // header value
        return headerUtils.getValue(this.headers, key, defVal);
    }
};
