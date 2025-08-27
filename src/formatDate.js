'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const dateArray = date.split(fromFormat[3]);
  const parts = [];

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    dateObject['YY'] = dateObject['YYYY'].slice(2);
  } else if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    if (+dateObject['YY'] < 30) {
      dateObject['YYYY'] = '20' + dateObject['YY'];
    } else {
      dateObject['YYYY'] = '19' + dateObject['YY'];
    }
  }

  for (let i = 0; i < 3; i++) {
    parts.push(dateObject[toFormat[i]]);
  }

  return parts.join(toFormat[3]);
}

module.exports = formatDate;
