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
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObj.YY < 30) {
      dateObj['YYYY'] = '20' + dateObj['YY'];
    } else {
      dateObj['YYYY'] = '19' + dateObj['YY'];
    }
  }

  const newFormatDate = [];

  for (let i = 0; i < 3; i++) {
    newFormatDate.push(dateObj[toFormat[i]]);
  }

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
