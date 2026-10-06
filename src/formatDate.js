'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dates = date.split(fromFormat[3]);
  let year = '';
  let month = '';
  let day = '';
  let result = '';

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        year = dates[i];
        break;

      case 'MM':
        month = dates[i];
        break;

      case 'DD':
        day = dates[i];
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (year.length === 2) {
          if (+year < 30) {
            year = 20 + year;
          } else {
            year = 19 + year;
          }
        }
        result += year + toFormat[3];
        break;

      case 'YY':
        if (year.length === 4) {
          year = year.slice(2);
        }
        result += year + toFormat[3];
        break;

      case 'MM':
        result += month + toFormat[3];
        break;

      case 'DD':
        result += day + toFormat[3];
        break;
    }
  }

  return result.slice(0, -1);
}
module.exports = formatDate;
