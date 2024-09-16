'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateNew = date.split(fromFormat[3]);
  const datePart = {};
  const dateFormatted = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    datePart[fromFormat[i]] = dateNew[i];
  }

  if (datePart.YYYY) {
    datePart.YY = datePart.YYYY.slice(2);
  }

  if (datePart.YY >= 30) {
    datePart.YYYY = '19' + datePart.YY;
  } else {
    datePart.YYYY = '20' + datePart.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    dateFormatted.push(datePart[toFormat[i]]);
  }

  return dateFormatted.join(toFormat[3]);
}

module.exports = formatDate;
