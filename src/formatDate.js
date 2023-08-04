'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  return arrangeDate(parseDate(date, fromFormat), toFormat);
}

/**
 * @param {string} date
 * @param {string[]} format
 *
 * @returns {Object}
 */
function parseDate(date, format) {
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_FORMAT_LONG = 'YYYY';
  const CENTURY_THRESHOLD = 30;
  const CENTURY_PREFIX_20 = 19;
  const CENTURY_PREFIX_21 = 20;

  const parts = format.slice(0, -1);
  const separator = format.slice(-1);
  const values = date.split(separator);
  const data = {};

  for (let i = 0; i < parts.length; i++) {
    data[parts[i]] = values[i];

    if (parts[i] === YEAR_FORMAT_LONG) {
      data[YEAR_FORMAT_SHORT] = values[i].substring(2);
    }

    if (parts[i] === YEAR_FORMAT_SHORT) {
      data[YEAR_FORMAT_LONG]
        = (+values[i] < CENTURY_THRESHOLD)
          ? CENTURY_PREFIX_21 + values[i]
          : CENTURY_PREFIX_20 + values[i];
    }
  }

  return data;
}

/**
 * @param {Object} data
 * @param {string[]} format
 *
 * @returns {string}
 */
function arrangeDate(data, format) {
  const parts = format.slice(0, -1);
  const separator = format.slice(-1);
  const values = [];

  for (const part of parts) {
    values.push(data[part]);
  }

  return values.join(separator);
}

module.exports = formatDate;
