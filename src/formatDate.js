'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDate = date.split(fromFormat[3]);
  const newFormat = [];
  let year = '';

  for (let i = 0; i < fromDate.length; i++) {
    for (const index in toFormat) {
      if (fromFormat[i] === toFormat[index]) {
        newFormat[toFormat.indexOf(fromFormat[i])] = fromDate[i];
      }

      if (fromFormat[i] === 'YY' && fromDate[i] < 30) {
        year = '20' + fromDate[i];
        newFormat[toFormat.indexOf('YYYY')] = year;
      }

      if (fromFormat[i] === 'YY' && fromDate[i] >= 30) {
        year = '19' + fromDate[i];
        newFormat[toFormat.indexOf('YYYY')] = year;
      }

      if (toFormat[i] === 'YY') {
        year = fromDate[i][2] + fromDate[i][3];
        newFormat[i] = year;
      }
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
