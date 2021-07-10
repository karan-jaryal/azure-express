const _ = require("lodash");

// A practical regex for RFC 2822 email spec. @see http://stackoverflow.com/a/1373724/1531054
const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (ajv) => {

    // anything parcelable to a valid Date Object
    ajv.addFormat("date", data => {
        let valid = _.isFinite(data) || _.isString(data) || _.isDate(data);
        valid = valid && new Date(data).toString() !== "Invalid Date";
        return valid;
    });

    // string with something to read. i.e not empy or blank
    ajv.addFormat("nonEmptyOrBlank", data => {
        return data.length > 0 && !/^\s+$/.test(data);
    });

    // string parcelable to a number
    ajv.addFormat("numberString", data => {
        return !isNaN(data) ? null : "Should be a numeric";
    });

    // true or false string
    ajv.addFormat("booleanString", data => {
        return data === "true" || data === "false"
            ? null
            : "Should be a true/false";
    });

    // email address
    ajv.addFormat("email", data => {
        return REGEX_EMAIL.test(data);
    });

    // true or false string
    ajv.addFormat("phoneWithCountryCodeExtention", data => {
        return /^[0-9]{11,15}$/.test(data)
            ? null
            : "Should be Valid phone number with country code extension.";
    });

    ajv.addFormat("countryCodeExtention", (data) => {
        return /^[0-9]{1,3}$/.test(data);
    });

    ajv.addFormat("mobileNumber", (data) => {
        return /^[0-9]{10,15}$/.test(data);
    });

    // objectId: function(data) {
    //     return mongoose.Types.ObjectId.isValid(data)
    //         ? null
    //         : "Should be an object id.";
    // },

    ajv.addFormat("positiveNumeric", (data) => {
        return data >= 0;
    })
}