'use strict';
/* eslint-disable no-console */

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const splittedDate = date.split(fromSeparator);

  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = splittedDate[i];
        break;
      case 'MM':
        month = splittedDate[i];
        break;
      case 'DD':
        day = splittedDate[i];
        break;
      default:
        break;
    }
  }

  const newDate = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YY':
        if (year.length === 2) {
          newDate[i] = year;
        } else {
          newDate[i] = `${year[2]}${year[3]}`;
        }
        break;
      case 'YYYY':
        if (year.length === 4) {
          newDate[i] = year;
        } else {
          if (+year < 30) {
            newDate[i] = `20${year}`;
          } else {
            newDate[i] = `19${year}`;
          }
        }
        break;
      case 'MM':
        newDate[i] = month;
        break;
      case 'DD':
        newDate[i] = day;
        break;
      default:
        break;
    }
  }

  const result = newDate.join(toSeparator);

  return result;
}

module.exports = formatDate;
