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

  const dateArr = date.split(oldSeparator);

  const dateObj = {};

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];

    if (dateObj['YY']) {
      if (dateObj['YY'] >= 30) {
        dateObj['YYYY'] = '19' + dateObj['YY'];
      } else {
        dateObj['YYYY'] = '20' + dateObj['YY'];
      }
    }

    if (dateObj['YYYY']) {
      dateObj['YY'] = dateObj['YYYY'].slice(2);
    }
  }

  const formattedDate = [];

  for (let i = 0; i < 3; i++) {
    formattedDate.push(dateObj[toFormat[i]]);
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
