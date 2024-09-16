'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};
  const newDate = [];

  for (let i = 0; i < dateParts.length; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  if (dateObject.hasOwnProperty('YYYY')) {
    dateObject.YY = dateObject.YYYY.slice(2);
  }

  if (dateObject.YY < 30) {
    dateObject.YYYY = '20' + dateObject.YY;
  } else {
    dateObject.YYYY = '19' + dateObject.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate[i] = dateObject[toFormat[i]];
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
