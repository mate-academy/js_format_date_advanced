'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayDate = date.split(`${fromFormat[3]}`);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        result[toFormat.indexOf('DD')] = arrayDate[i];
        break;

      case 'MM':
        result[toFormat.indexOf('MM')] = arrayDate[i];
        break;

      case 'YYYY':
        if (toFormat.includes('YY')) {
          result[toFormat.indexOf('YY')] = arrayDate[i].slice(2);
          break;
        }

        result[toFormat.indexOf('YYYY')] = arrayDate[i];
        break;

      case 'YY':
        if (arrayDate[i] < 30) {
          result[toFormat.indexOf('YYYY')] = '20' + arrayDate[i];
          break;
        }

        result[toFormat.indexOf('YYYY')] = '19' + arrayDate[i];
        break;
    }
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
