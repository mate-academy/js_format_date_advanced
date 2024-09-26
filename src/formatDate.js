'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};

  for (let dateIter = 0; dateIter < fromFormat.length; dateIter++) {
    dateObj[fromFormat[dateIter]] = dateArr[dateIter];
  }

  if ('YYYY' in dateObj) {
    dateObj.YY = dateObj.YYYY % 100;
  } else {
    if (dateObj.YY < 30) {
      dateObj.YYYY = `20${dateObj.YY}`;
    } else {
      dateObj.YYYY = `19${dateObj.YY}`;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    formatedDate.push(dateObj[toFormat[i]]);
  }

  return formatedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
