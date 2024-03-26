'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = [];
  const SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE = date.split(SEPARATOR);

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = DATE[i];
    }

    if (fromFormat[i] === 'MM') {
      month = DATE[i];
    }

    if (fromFormat[i] === 'DD') {
      day = DATE[i];
    }
  }

  for (let k = 0; k < toFormat.length - 1; k++) {
    if (toFormat[k] === 'YYYY') {
      if (year.length <= 2 && year < 30) {
        result[k] = `20${year}`;
      }

      if (year.length <= 2 && year >= 30) {
        result[k] = `19${year}`;
      }

      if (year.length === 4) {
        result[k] = year;
      }
    }

    if (toFormat[k] === 'YY') {
      if (year.length > 2) {
        result[k] = year.slice(2);
      } else {
        result[k] = year;
      }
    }

    if (toFormat[k] === 'MM') {
      result[k] = month;
    }

    if (toFormat[k] === 'DD') {
      result[k] = day;
    }
  }

  result = result.join(NEW_SEPARATOR);

  return result;
}

module.exports = formatDate;
