const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
const format = require("./ajvFormat");
const ApiError = require('./ApiError');
const _ = require("lodash");
//inject custom format to ajv
format(ajv)

/**
 * Validate data against schema.
 * Throws API error if data is invalid.
 *
 * @param {*} data data to validate.
 * @param {object} schema ajv schema object.
 */
module.exports = (schema, data) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        const message = ajv.errorsText(validate.errors)
        throw ApiError.baseErrors.INVALID_INPUT(message)
    }

}