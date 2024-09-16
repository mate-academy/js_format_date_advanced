'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const DATES = date.split(fromFormat[fromFormat.length - 1]);

  let year = 0;
  let month = 0;
  let day = 0;
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        year = DATES[i] * 1;
        break;
      case 'YYYY':
        year = DATES[i] * 1;
        break;
      case 'DD':
        day = DATES[i];
        break;
      case 'MM':
        month = DATES[i];
        break;
    }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    year %= 100;
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        result.push(year);
        break;
      case 'YYYY':
        if (fromFormat.includes('YY')) {
          if (year < 30) {
            year += 2000;
          } else {
            year += 1900;
          }
        }
        result.push(year);
        break;
      case 'DD':
        result.push(day);
        break;
      case 'MM':
        result.push(month);
        break;
    }
  }

  return result.join(toFormat[toFormat.length - 1]);
}
module.exports = formatDate;
