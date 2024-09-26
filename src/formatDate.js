'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = {};
  const dateArr = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = dateArr[i];
  }

  if (dateParts.YYYY) {
    dateParts.YY = dateParts.YYYY.slice(2);
  }

  if (dateParts.YY < 30) {
    dateParts.YYYY = '20' + dateParts.YY;
  } else {
    dateParts.YYYY = '19' + dateParts.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    dateArr[i] = dateParts[toFormat[i]];
  }

  return dateArr.join(toFormat[3]);
}

module.exports = formatDate;
