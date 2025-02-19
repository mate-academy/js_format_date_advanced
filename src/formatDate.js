'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const object = {};
  const splitDate = date.split(fromFormat[fromFormat.length - 1]);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      if (splitDate[i] < 30) {
        object[fromFormat[i] + 'YY'] = '20' + splitDate[i];
      } else {
        object[fromFormat[i] + 'YY'] = '19' + splitDate[i];
      }
    } else {
      object[fromFormat[i]] = splitDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY') {
      result.push(object['YYYY'].slice(-2));
    } else {
      result.push(object[toFormat[i]]);
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
