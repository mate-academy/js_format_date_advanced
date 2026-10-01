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

  const dateArr = date.split(fromFormat[3]);
  const fromYYYY = fromFormat.indexOf('YYYY');
  const indexYear = fromYYYY === -1 ? fromFormat.indexOf('YY') : fromYYYY;
  const year = dateArr[indexYear];

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    dateArr[indexYear] = year.slice(-2);
  } else if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    dateArr[indexYear] = year < 30 ? '20' + year : '19' + year;
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY' && toFormat.indexOf(fromFormat[i]) === -1) {
      result[toFormat.indexOf('YYYY')] = dateArr[i];
      continue;
    }

    if (fromFormat[i] === 'YYYY' && toFormat.indexOf(fromFormat[i]) === -1) {
      result[toFormat.indexOf('YY')] = dateArr[i];
      continue;
    }

    result[toFormat.indexOf(fromFormat[i])] = dateArr[i];
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
