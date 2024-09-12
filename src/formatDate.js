'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const dateSplit = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateSplit[i];
  }

  if (dateObj.YY >= 30) {
    dateObj.YYYY = '19' + dateObj.YY;
  } else if (dateObj.YY < 30) {
    dateObj.YYYY = '20' + dateObj.YY;
  } else {
    dateObj.YY = dateObj.YYYY.slice(2);
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(dateObj[toFormat[i]]);
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
