'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let resultDate = '';
  const objectDateFormat = {};
  const dateSplitted = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const less = dateSplitted[i] < 30;
    const more = dateSplitted[i] >= 30;

    if (fromFormat[i] === 'YY' && toFormat.includes('YYYY') && less) {
      objectDateFormat.YYYY = '20' + dateSplitted[i];
    } else if (fromFormat[i] === 'YY' && toFormat.includes('YYYY') && more) {
      objectDateFormat.YYYY = '19' + dateSplitted[i];
    }

    if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      objectDateFormat.YY = dateSplitted[i][2] + dateSplitted[i][3];
    } else {
      objectDateFormat[fromFormat[i]] = dateSplitted[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (i > 0) {
      resultDate += toFormat[toFormat.length - 1];
    }

    resultDate += objectDateFormat[toFormat[i]];
  }

  return resultDate;
}

module.exports = formatDate;
