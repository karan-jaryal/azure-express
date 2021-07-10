const _ = require('lodash');
const AzureRequest = require('./AzureRequest');
const AzureResponse = require('./AzureResponse');

/**
 * Encapsulates async API middlewares as a azure function handler.
 * Middleware functions have signture: async function(Request,Response),
 * While, error handling ones have signature: async function(Error,Request,Response)
 */
module.exports = class AzureApi {
    /**
     * Constructor
     * @param {function} [fns] async middleware functions
     */
    constructor(...fns) {
        this._fns = fns || [];
        this._meta = {};
    }

    /**
     * Add an async middleware function.
     * @param {function} fn async middleware function
     */
    use(fn) {
        this._fns.push(fn);
    }

    /**
     * Set metadata to be injected nto request meta
     * @param {object} val metadata
     */
    setMeta(val) {
        _.assign(this._meta, val);
    }

    /**
     * Azure equivalent function
     * @type {function(Context,req)}
     */
    get AzureFn() {
        // create handler
        return async (context, request) => {
            // init request, response and error
            const req = new AzureRequest(context, request);
            const res = new AzureResponse(context);
            let err = null;

            // call all async middleware functions
            const callFns = async () => {
                for (let fn of this._fns) {
                    try {
                        if (err === null && fn.length < 3) {
                            // normal middleware
                            await fn(req, res);
                        } else if (err !== null && fn.length >= 3) {
                            // error handler middleware
                            await fn(err, req, res);
                            err = null;
                        }
                    } catch (e) {
                        // last error
                        err = e;
                    }
                }
            };

            // run middleware, handle any leaking errors and pending functions completions
            await callFns()
            if (!res.isSent && err) {
                context.done(err)
            }


        };
    }
};
