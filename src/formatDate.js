'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];
  const dateObj = {};

  for (let i = 0; i < oldDate.length; i++) {
    dateObj[fromFormat[i]] = oldDate[i];
  }

  if (!dateObj.hasOwnProperty('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(2, 4);
  }

  if (!dateObj.hasOwnProperty('YYYY') && dateObj['YY'] < 30) {
    dateObj['YYYY'] = '20' + dateObj['YY'];
  }

  if (!dateObj.hasOwnProperty('YYYY')) {
    dateObj['YYYY'] = '19' + dateObj['YY'];
  }

  for (let i = 0; i < oldDate.length; i++) {
    const dimension = toFormat[i];

    newDate.push(dateObj[dimension]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
