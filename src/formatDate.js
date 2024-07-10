'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const separator2 = toFormat[toFormat.length - 1];

  const curDate = date.split(separator);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = curDate[i];
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' && fromFormat.indexOf('YY') !== -1) {
      let curYear = dateObj['YY'];

      if (curYear < 30) {
        curYear = '20' + curYear;
      } else {
        curYear = '19' + curYear;
      }

      result.push(curYear);
      continue;
    }

    if (toFormat[i] === 'YY' && fromFormat.indexOf('YYYY') !== -1) {
      result.push(dateObj['YYYY'].slice(-2));
      continue;
    }

    result.push(dateObj[toFormat[i]]);
  }

  return result.join(separator2);
}

module.exports = formatDate;
