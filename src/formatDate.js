'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateInOldFormat = {};

  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const dateInputArr = date.split(oldSeparator);

  for (let i = 0; i <= 2; i++) {
    dateInOldFormat[fromFormat[i]] = dateInputArr[i];
  }

  if (!dateInOldFormat['YY']) {
    dateInOldFormat['YY'] = dateInOldFormat.YYYY.slice(2);
  }

  if (!dateInOldFormat['YYYY']) {
    if (dateInOldFormat['YY'] < 30 || dateInOldFormat['YY'] === '00') {
      dateInOldFormat['YYYY'] = '20' + dateInOldFormat.YY;
    } else {
      dateInOldFormat['YYYY'] = '19' + dateInOldFormat.YY;
    }
  }

  const arrNewDate = [];

  for (const part of toFormat.slice(0, -1)) {
    arrNewDate.push(dateInOldFormat[part]);
  }

  return arrNewDate.join(newSeparator);
}
module.exports = formatDate;
