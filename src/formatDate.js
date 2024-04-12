'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateSeparator = fromFormat[fromFormat.length - 1];
  const newDateSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(oldDateSeparator);
  const oldDate = {};
  const newDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldDate[fromFormat[i]] = dateParts[i];
  }

  if (oldDate.hasOwnProperty('YYYY')) {
    oldDate['YY'] = oldDate['YYYY'].slice(-2);
  }

  if (oldDate.YY >= 30) {
    oldDate.YYYY = '19' + oldDate.YY;
  } else {
    oldDate.YYYY = '20' + oldDate.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(oldDate[toFormat[i]]);
  }

  return newDate.join(newDateSeparator);
}

module.exports = formatDate;
