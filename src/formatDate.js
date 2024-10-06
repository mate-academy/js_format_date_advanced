'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(`${oldSeparator}`);
  const dateObject = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  if (dateObject.YY) {
    if (dateObject.YY < '30') {
      dateObject.YYYY = '20' + dateObject.YY;
    } else {
      dateObject.YYYY = '19' + dateObject.YY;
    }
  }

  if (dateObject.YYYY) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  }

  const newDateArr = [];

  for (const key in dateObject) {
    const index = toFormat.indexOf(key);

    newDateArr[index] = dateObject[key];
  }

  const newDate = newDateArr.join(`${newSeparator}`);

  return newDate;
}

module.exports = formatDate;
