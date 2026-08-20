'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const dateParts = date.split(fromSeparator);

  const values = {};

  for (let i = 0; i < 3; i++) {
    values[fromFormat[i]] = dateParts[i];
  }

  if (values.YYYY && !values.YY) {
    values.YY = values.YYYY.slice(-2);
  }

  if (values.YY && !values.YYYY) {
    const year = Number(values.YY);

    if (year < 30) {
      values.YYYY = `20${values.YY}`;
    } else {
      values.YYYY = `19${values.YY}`;
    }
  }

  let result = '';

  for (let i = 0; i < 3; i++) {
    result += values[toFormat[i]];

    if (i < 2) {
      result += toSeparator;
    }
  }

  return result;
}

module.exports = formatDate;
