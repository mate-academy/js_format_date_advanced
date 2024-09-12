'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const temp = {};
  const result = [];
  const dateSplit = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY') {
      if (dateSplit[i] < 30) {
        dateSplit[i] = 20 + dateSplit[i];
      } else {
        dateSplit[i] = 19 + dateSplit[i];
      }
      temp.YYYY = dateSplit[i];
    } else {
      temp[fromFormat[i]] = dateSplit[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YY') {
      result.push(temp.YYYY.slice(2));
    } else {
      result.push(temp[toFormat[i]]);
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
