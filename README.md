 API Azure Functions

This project serves as the serverless API system for Demo. The API is designed and deployed in  azure functions.

## Requirements

1. [AzureFunctions](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
3. [NodeJS](https://nodejs.org/en/) `> 10`



## Recommended IDE

[Vscode](https://code.visualstudio.com/) is recommended as the debug configuration is provided assuming vscode.



### Simple Usage:
```
--project-root                         
        |_  <function-name>               // Azure function name
            |_function.json             // Define function trigger and bindling
            |_ index.js                // Functions code for handler
        |_lib                         // All library function should be in this folder                                   
            
```
Typical *index.js:*

``` javascript

const Azure = require("lib").AzureFunction;
async function handler(req, res) {
    res.send("Hello World")
}
module.exports = Azure.from(handler, {});

```
#### Metadata

A azure instance can save custom metadata about it which is later accessible via Route's `meta` property.

``` javascript

const Azure = require("lib").AzureFunction;
async function handler(req, res) {
    res.send("Hello World")
}
module.exports = Azure.from(handler, {isPublic:true});

```

#### Validation

We can  enforce JSON schema validation of inputs.

Method `validate()`
accept JSON Schema to validate request body, url query and path paramerters respectively.

See [`ajv` documentation](https://ajv.js.org/) for more details about JSON schema validation.
Example:

``` javascript

const Azure = require("lib").AzureFunction;
const validate = require("lib").validate;
async function handler(req, res) {
    const schema = {
        "properties": {
            "name": { "type": "string", format: "nonEmptyOrBlank" },
            "age": { "type": "number" }
        }, required: ["name"]
    }
    //validate schema
    validate(schema, req.query);

    res.send("Hello World")
}
module.exports = Azure.from(handler, {isPublic:true});

```
#### Middleware

Middleware functions are provided to route's `use()` method. It supports chained method calls.
This helps divide route functionality in discrete processing steps.(lib/AzureFunction.js)
Example:

``` javascript

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

        // pre middleware(can add middelware according to requirement)
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


```

## Error Handling
Any errors propagated down the middleware chain (for example, from routes) will be 
logged and returned to clients in a standard format.

Error handling middleware automatically converts other error types to ApiError standard 
and clients receive a standard response:

``` javascript

{
    "code": "ERR_EMAIL_EXISTS"
    "message": "Email is already registered."
}

```
### ApiError
ApiError is provided as the standard type for throwing/propagating API level errors.
It adds some functionality over `Error` type that is useful when building web API's(lib/ApiErrorCodes.js)
Just need to add your custom error in below fomat in ```ApiErrorCodes.js```
``` javascript
'INVALID_INPUT': {
    status: 400,
    message: 'Invalid input in request'
  }
```
You can than throw custom error using ``` throwApiError.baseErrors.INVALID_INPUT();```
You can also override message as ``` throwApiError.baseErrors.INVALID_INPUT("Invalid Email");```

``` javascript

const Azure = require("lib").AzureFunction;
const validate = require("lib").validate;
const ApiError = require("lib").ApiError;
async function handler(req, res) {
    const schema = {
        "properties": {
            "name": { "type": "string", format: "nonEmptyOrBlank" },
            "age": { "type": "number" }
        }, required: ["name"]
    }
    //validate schema
    validate(schema, req.query);

    //method to check email
     const isExist = await checkEmail("abc@gmail.com");
     if(!isExist){
         throw ApiError.baseErrors.NOTFOUND();
     }
    res.send("Logged In")
}

```

`ApiError` is provided as the standard type for throwing/propagating API level errors.
It adds some functionality over `Error` type that is useful when building web API's

## Building API service

The following steps are required for setup:

1. Install `nodejs` version `10` or greater.
2. Clone this git repository and go to root directory.
3. Install model modules: `npm install`

## Running a service

The following steps are required for debugging a service locally:
1. Run a local version of API: `func host start`


