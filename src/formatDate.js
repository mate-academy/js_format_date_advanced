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
    const year = Number(dateObject.YY);

    dateObject.YYYY = year < 30 ? '20' + dateObject.YY : '19' + dateObject.YY;
  }

  if (dateObject.YYYY) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  }

  const newDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    if (dateObject[key]) {
      newDateArr.push(dateObject[key]);
    }
  }

  const newDate = newDateArr.join(`${newSeparator}`);

  return newDate;
}

module.exports = formatDate;
