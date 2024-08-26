'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateFormat = date.split(fromFormat[fromFormat.length - 1]);
  const newDateFormat = [];

  for (let i = 0; i < oldDateFormat.length; i++) {
    if (toFormat.indexOf(fromFormat[i]) === -1) {
      if (fromFormat[i].length === 2) {
        if (+oldDateFormat[i] < 30) {
          newDateFormat[toFormat.indexOf('YYYY')] = '20' + oldDateFormat[i];
        } else {
          newDateFormat[toFormat.indexOf('YYYY')] = '19' + oldDateFormat[i];
        }
      } else {
        newDateFormat[toFormat.indexOf('YY')] = oldDateFormat[i].slice(-2);
      }
      continue;
    }
    newDateFormat[toFormat.indexOf(fromFormat[i])] = oldDateFormat[i];
  }

  return newDateFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
