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

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  if (dateObj['YYYY']) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  } else if (dateObj['YY']) {
    dateObj['YYYY'] = parseInt(dateObj['YY']) < 30 ? '20' + dateObj['YY'] : '19'
    + dateObj['YY'];
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate += dateObj[toFormat[i]] + toFormat[3];
  }

  return newDate.slice(0, -1);
}

module.exports = formatDate;
