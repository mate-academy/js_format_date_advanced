'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateData = date.split(fromFormat[3]);

  const result = [];
  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateData[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateData[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateData[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && year.length === 4) {
      result.push(year);
    } else if (toFormat[i] === 'YY' && year.length === 4) {
      result.push(year.slice(2));
    } else if (toFormat[i] === 'YYYY' && year.length === 2) {
      if (+year < 30) {
        result.push(`20${year}`);
      } else {
        result.push(`19${year}`);
      }
    } else if (toFormat[i] === 'MM') {
      result.push(month);
    } else if (toFormat[i] === 'DD') {
      result.push(day);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
