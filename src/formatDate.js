'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let day = '';
  let month = '';
  let year = '';
  let result = '';
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const splits = date.split(fromSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i][0] === 'Y') {
      year = splits[i];
    } else if (fromFormat[i][0] === 'M') {
      month = splits[i];
    } else {
      day = splits[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i][0] === 'Y') {
      if (toFormat[i].length === 4 && year.length === 2) {
        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
      } else if (toFormat[i].length === 2 && year.length === 4) {
        year = year.slice(2);
      }

      result += year + toSeparator;
    } else if (toFormat[i][0] === 'M') {
      result += month + toSeparator;
    } else {
      result += day + toSeparator;
    }
  }

  return result.substring(0, result.length - 1);
}

module.exports = formatDate;
