'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const dateArray = date.split(separatorFrom);
  const result = [];
  let day;
  let month;
  let year;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArray[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = dateArray[i];
    }
  }

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'DD') {
      result[j] = day;
    }

    if (toFormat[j] === 'MM') {
      result[j] = month;
    }

    if (toFormat[j] === 'YYYY' && year.length === 4) {
      result[j] = year;
    }

    if (toFormat[j] === 'YY' && year.length === 4) {
      result[j] = year.slice(2);
    }

    if (toFormat[j] === 'YYYY' && year.length === 2) {
      if (year >= 30) {
        result[j] = '19' + year;
      } else {
        result[j] = '20' + year;
      }
    }
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
