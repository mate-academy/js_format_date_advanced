'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const result = [];
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};

  for (let index = 0; index < dateArr.length; index++) {
    dateObj[fromFormat[index]] = dateArr[index];
  }

  for (const item of toFormat) {
    switch (true) {
      case item === 'YY' && dateObj.hasOwnProperty('YYYY'):
        result.push(dateObj['YYYY'].substring(dateObj['YYYY'].length - 2));
        break;

        // use 20YY if YY < 30 and 19YY otherwise.
      case item === 'YYYY' && dateObj.hasOwnProperty('YY'):
        if (dateObj['YY'] < 30) {
          result.push('20' + dateObj['YY']);
        } else {
          result.push('19' + dateObj['YY']);
        }
        break;

      case dateObj.hasOwnProperty(item):
        result.push(dateObj[item]);
        break;

      default:
        break;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
