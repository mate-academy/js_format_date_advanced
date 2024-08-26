'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayOldDate = date.split(fromFormat[3]);

  let year = '';
  let day = '';
  let month = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = arrayOldDate[i];
      continue;
    }

    if (fromFormat[i] === 'DD') {
      day = arrayOldDate[i];
      continue;
    }

    if (fromFormat[i] === 'MM') {
      month = arrayOldDate[i];
      continue;
    }
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      if (toFormat[i].length === year.length) {
        result[i] = year;
      } else {
        if (year.length === 2) {
          if (+year < 30) {
            result[i] = '20' + year;
          } else {
            result[i] = '19' + year;
          }
        } else {
          result[i] = year.slice(2);
        }
      }
      continue;
    }

    if (toFormat[i] === 'MM') {
      result[i] = month;
      continue;
    }

    if (toFormat[i] === 'DD') {
      result[i] = day;
      continue;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
