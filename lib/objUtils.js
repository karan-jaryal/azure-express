const _ = require('lodash');
const moment = require('moment');

/**
 * Check if value is a non empty string
 * @param {*} val
 * @returns {boolean} True if value is non empty string
 */
module.exports.isText = function (val) {
    return _.isString(val) && val.length > 0 && !/^\s+$/.test(val);
};

/**
 * Safely convert value to date, or return undefined is not a date
 * @param {*} val
 * @returns {Date|undefined} Date or undefined
 */
module.exports.toDate = function (val) {
    // already a date
    if (_.isDate(val)) {
        return val;
    }

    // init as date
    const date = new Date(val);

    // not a date
    if (date.toString() === 'Invalid Date') {
        // try to convert in valid date
        const momentDate = moment(val, ['DDMMMMY', 'MMMMDDYHmA', 'dddMMMDDHHmmssz']).format();

        if (momentDate.toString() === 'Invalid Date') {
            return undefined;
        } else {
            return momentDate;
        }
    }

    // date
    return date;
};

/**
 * Find fist existing property in object for given path(s).
 * @param {*} obj object to find in
 * @param {string|string[]} paths path or array of paths to search
 * @param {function} [convert] function to convert value when found
 * @param {function} [predicate] function to filter value when found
 * @returns {*} first matching value
 */
module.exports.lookupVal = function (obj, paths, convert, predicate) {
    // default convert and predicate
    if (arguments.length <= 2) {
        convert = _.identity;
        predicate = _.constant(true);
    }

    // only predicate
    if (arguments.length === 3) {
        predicate = convert;
        convert = _.identity;
    }

    // paths to array
    if (!_.isArray(paths)) {
        paths = [paths];
    }

    // search, covert, filter and return first
    return _.chain(paths)
        .filter(p => _.has(obj, p))
        .map(p => _.get(obj, p))
        .map(convert)
        .filter(predicate)
        .head()
        .value();
};

/**
 * Find non empty text value for given paths
 * @param {*} obj object
 * @param {string|string[]} paths path(s)
 * @returns {string} first matching value
 */
module.exports.lookupValText = function (obj, paths) {
    return module.exports.lookupVal(obj, paths, module.exports.isText);
};

/**
 * Find Date value for given paths
 * @param {*} obj object
 * @param {string|string[]} paths path(s)
 * @returns {string} first matching value
 */
module.exports.lookupValDate = function (obj, paths) {
    return module.exports.lookupVal(obj, paths, module.exports.toDate, _.isDate);
};

/**
 * Find Integer value for given paths
 * @param {*} obj object
 * @param {string|string[]} paths path(s)
 * @returns {string} first matching value
 */
module.exports.lookupValInteger = function (obj, paths) {
    return module.exports.lookupVal(obj, paths, _.toInteger, _.isFinite);
};

/**
 * Find non empty text value for given paths
 * @param {*} obj object
 * @param {string|string[]} paths path(s)
 * @returns {[]} first matching value
 */
module.exports.lookupValAuthors = function (obj, paths) {
    // only predicate
    const predicate = module.exports.isText;
    const convert = _.identity;

    // paths to array
    if (!_.isArray(paths)) {
        paths = [paths];
    }

    // search, covert, filter and return first
    const value = _.chain(paths)
        .filter(p => _.has(obj, p))
        .map(p => _.get(obj, p))
        .map(convert)
        .filter(predicate)
        .value();

    // return value as array
    if (_.isArray(value)) {
        // create response
        let result = [];

        _.forEach(value, (data, key) => {
            if (_.isString(data)) {
                result.push({
                    name: data
                });
            } else if (_.isObject(value)) {
                if (_.has(data, 'name')) result.push({ name: value.name });
            }
        });

        return result;
    } else if (_.isString) {
        return [{ name: value }];
    }
};
