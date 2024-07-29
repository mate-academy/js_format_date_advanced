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
  const values = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    dateParts[fromFormat[i]] = values[i];
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    let value = dateParts[toFormat[i]];

    if (toFormat[i] === 'YY' && (dateParts['YYYY'] || dateParts['YY'])) {
      value = (dateParts['YYYY'] || dateParts['YY']).slice(-2);
    } else if (toFormat[i] === 'YYYY' && dateParts['YY']) {
      const year = Number(dateParts['YY']);

      if (year < 30) {
        value = '20' + dateParts['YY'];
      } else {
        value = '19' + dateParts['YY'];
      }
    }

    result.push(value);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
