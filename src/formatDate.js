'use strict';

const CENTURY_THRESHOLD = 30;
const THIS_CENTURY = 2000;
const PREVIOUS_CENTURY = 1900;
const SEPARATOR_INDEX = 3;

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  return dateToString(parseDate(date, fromFormat), toFormat);
}

/**
 * @param {string} date
 * @param {string[]} format
 *
 *
 * @returns {Object}
 */
function parseDate(date, format) {
  // create regexp from format array
  let formatRegex = format.slice(0, -1).join(format[SEPARATOR_INDEX]);

  formatRegex = formatRegex.replace('YYYY', '(?<year>[0-9]{4})');
  formatRegex = formatRegex.replace('YY', '(?<year>[0-9]{2})');
  formatRegex = formatRegex.replace('MM', '(?<month>[0-9]{2})');
  formatRegex = formatRegex.replace('DD', '(?<day>[0-9]{2})');

  formatRegex = RegExp(formatRegex);

  // use said regexp to parse date
  const match = date.match(formatRegex);
  const dateObj = {};

  for (const key in match.groups) {
    dateObj[key] = Number(match.groups[key]);
  }

  // get correct year from short format if necessary
  if (format.includes('YY')) {
    if (dateObj.year >= CENTURY_THRESHOLD) {
      dateObj.year += PREVIOUS_CENTURY;
    } else {
      dateObj.year += THIS_CENTURY;
    }
  }

  return dateObj;
}

/**
 * @param {Object} date
 * @param {string[]} format
 *
 *
 * @returns {string}
 */
function dateToString(date, format) {
  const formatBase = format.slice(0, -1).join(format[SEPARATOR_INDEX]);

  let dateStr = formatBase.replace('YYYY', prettyNumString(date.year, 4));

  dateStr = dateStr.replace('YY', prettyNumString(date.year, 2));
  dateStr = dateStr.replace('MM', prettyNumString(date.month, 2));
  dateStr = dateStr.replace('DD', prettyNumString(date.day, 2));

  return dateStr;
}

/**
 * @param {number} num
 * @param {number} length
 */
function prettyNumString(num, length) {
  return num.toString().padStart(length, '0').slice(-length);
}

module.exports = formatDate;
