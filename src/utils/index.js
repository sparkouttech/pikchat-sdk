const moment = require('moment');

/**
 * constants
 */
const DATE_TIME = 'YYYY-MM-DD HH:mm:ss';
const DATE = 'YYYY-MM-DD';
const TIME = 'HH:mm:ss';

/**
 * 
 * @returns 
 */
const getCurrentUtcDateTime = () => {
    return moment().utc().format(DATE_TIME);
}

/**
 * 
 * @returns 
 */
const getCurrentUtcDate = () => {
    return moment().utc().format(DATE);
}

/**
 * 
 * @returns 
 */
const getCurrentUtcTime = () => {
    return moment().utc().format(TIME);
}

const utils = {
    getCurrentUtcDateTime,
    getCurrentUtcDate,
    getCurrentUtcTime
};

module.exports = utils;