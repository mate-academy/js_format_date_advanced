'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const oldDate = {};
  const newDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldDate[fromFormat[i]] = dateParts[i];
    newDate[toFormat[i]] = '';
  }

  const oldYearFormat = oldDate.hasOwnProperty('YYYY')
    ? 'YYYY'
    : 'YY';
  const newYearFormat = newDate.hasOwnProperty('YYYY')
    ? 'YYYY'
    : 'YY';

  newDate[newYearFormat] = oldDate[oldYearFormat];

  if (newYearFormat.length === 2 && oldYearFormat.length === 4) {
    newDate[newYearFormat] = oldDate[oldYearFormat].slice(-2);
  }

  if (newYearFormat.length === 4 && oldYearFormat.length === 2) {
    if (oldDate[oldYearFormat] < 30) {
      newDate[newYearFormat] = '20' + oldDate[oldYearFormat];
    } else {
      newDate[newYearFormat] = '19' + oldDate[oldYearFormat];
    }
  }

  for (const property in newDate) {
    if (property === 'YY' || property === 'YYYY') {
      continue;
    }
    newDate[property] += oldDate[property];
  }

  return Object.values(newDate).join(toFormat[3]);
}

module.exports = formatDate;
