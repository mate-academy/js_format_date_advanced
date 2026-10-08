'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  dateObject.separator = toFormat[toFormat.length - 1];

  let formatedString = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' && dateObject[toFormat[i]] === undefined) {
      formatedString += dateObject['YYYY'].slice(2) + dateObject.separator;
    } else if (
      toFormat[i] === 'YYYY' &&
      dateObject[toFormat[i]] === undefined
    ) {
      if (dateObject['YY'] < 30) {
        formatedString += '20' + dateObject['YY'] + dateObject.separator;
      } else {
        formatedString += '19' + dateObject['YY'] + dateObject.separator;
      }
    } else {
      formatedString += dateObject[toFormat[i]] + dateObject.separator;
    }
  }

  return formatedString.slice(0, -1);
}

module.exports = formatDate;
