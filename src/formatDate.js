'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const values = date.split(fromFormat[3]);

  const valuesObject = {};

  for (let i = 0; i < 3; i++) {
    valuesObject[fromFormat[i]] = values[i];
  }

  const resultArray = [];

  for (let j = 0; j < 3; j++) {
    if (toFormat[j] in valuesObject) {
      resultArray.push(valuesObject[toFormat[j]]);
    } else if (toFormat[j] === 'YY') {
      resultArray.push(valuesObject['YYYY'].slice(2));
    } else if (toFormat[j] === 'YYYY') {
      if (valuesObject['YY'] < '30') {
        resultArray.push('20' + valuesObject['YY']);
      } else {
        resultArray.push('19' + valuesObject['YY']);
      }
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
