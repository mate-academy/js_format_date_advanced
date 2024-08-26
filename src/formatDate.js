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
    if (fromFormat[i].includes('Y') && toFormat.indexOf(fromFormat[i]) === -1) {
      if (fromFormat[i] === 'YY') {
        if (+oldDateFormat[i] < 30) {
          newDateFormat[i] = '20' + oldDateFormat[fromFormat.indexOf('YY')];
        } else {
          newDateFormat[i] = '19' + oldDateFormat[fromFormat.indexOf('YY')];
        }
      } else if (fromFormat[i] === 'YYYY') {
        newDateFormat[toFormat.indexOf('YY')] = oldDateFormat[i].slice(-2);
      }
      continue;
    }
    newDateFormat[toFormat.indexOf(fromFormat[i])] = oldDateFormat[i];
  }

  return newDateFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
