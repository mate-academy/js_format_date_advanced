'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const CUR_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE = date.split(CUR_SEPARATOR);
  const dateObj = {};
  const result = [];

  for (let i = 0; i < DATE.length; i++) {
    dateObj[fromFormat[i]] = DATE[i];
  }

  for (let i = 0; i < 3; i++) {
    if (dateObj[toFormat[i]]) {
      result.push(dateObj[toFormat[i]]);
    } else if (dateObj['YYYY']) {
      result.push(convertYear(dateObj['YYYY']));
    } else {
      result.push(convertYear(dateObj['YY']));
    }
  }

  function convertYear(year) {
    if (year.length === 4) {
      return year.slice(2);
    }

    if (+year < 30) {
      return `20${year}`;
    } else {
      return `19${year}`;
    }
  }

  return result.join(NEW_SEPARATOR);
}

module.exports = formatDate;
