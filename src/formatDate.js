'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  let year = '';
  let month = '';
  let day = '';
  let spliter = '';
  let joiner = '';

  for (const type of fromFormat) {
    if (type.length === 1) {
      spliter = type;
    }
  }

  for (const type of toFormat) {
    if (type.length === 1) {
      joiner = type;
    }
  }

  const numbers = date.split(spliter);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = numbers[i];
        break;

      case 'YY':
        year = numbers[i];
        break;

      case 'MM':
        month = numbers[i];
        break;

      case 'DD':
        day = numbers[i];
        break;
    }
  }

  for (const type of toFormat) {
    switch (type) {
      case 'YYYY':
        if (year.length === 2) {
          if (year < 30) {
            year = '20' + year;
          } else {
            year = '19' + year;
          }
        }
        result.push(year);
        break;

      case 'YY':
        if (year.length === 4) {
          year = year.slice(2);
        }
        result.push(year);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;
    }
  }

  return result.join(joiner);
}

module.exports = formatDate;
