'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const separator = toFormat[3];
  const arrDate = date.split(oldSeparator);
  let day = '';
  let month = '';
  let year = '';
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = arrDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = arrDate[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = arrDate[i];
    }
  }

  if (toFormat.includes('YY') && year.length > 2) {
    year = year.slice(-2);
  }

  if (toFormat.includes('YYYY') && year.length < 4) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      result[i] = day;
    }

    if (toFormat[i] === 'MM') {
      result[i] = month;
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      result[i] = year;
    }
  }

  return result.join(separator);
}

module.exports = formatDate;
