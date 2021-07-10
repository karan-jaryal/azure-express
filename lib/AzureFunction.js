const AzureApi = require('./AzureApi');
const bodyParser = require('./bodyParser');
const corsHeaders = require('./corsHeaders');
const errorHandler = require('./errorHandler');

/**
 * Builds API azure function stack with middleware.
 */
module.exports = class AzureFunction {
    /**
     * Constructor
     * @param {function} fn async API function
     * @param {object} [meta] metadata
     */
    constructor(fn, meta = {}) {
        // init handler
        this._api = new AzureApi();

        // set meta
        this._api.setMeta(meta);

        // pre middleware
        this._api.use(corsHeaders);
        this._api.use(bodyParser);

        // API function
        this._api.use(fn);

        // post middleware
        this._api.use(errorHandler);

        // define handler
        this.handler = this._api.AzureFn;
    }

    /**
     * Generate a new azure function instance
     * @param {function} fn async API function
     * @param {object} [meta] metadata
     * @returns {AzureFunction} instance
     */
    static from(fn, meta = {}) {
        return new AzureFunction(fn, meta);
    }
};
