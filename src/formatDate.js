'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];

  let arrayDate = [];

  if (fromSeparator === '.') {
    arrayDate = date.split('.');
  } else if (fromSeparator === '-') {
    arrayDate = date.split('-');
  } else if (fromSeparator === '/') {
    arrayDate = date.split('/');
  }

  let day = '';
  let month = '';
  let year = '';

  let j = 0;

  for (let i = 0; i < arrayDate.length; i++) {
    if (fromFormat[j] === 'DD') {
      day += arrayDate[i];
    }

    if (fromFormat[j] === 'MM') {
      month += arrayDate[i];
    }

    if (fromFormat[j] === 'YYYY' || fromFormat[j] === 'YY') {
      year += arrayDate[i];
    }
    j++;
  }

  const separator = toFormat[3];
  const toFormatWithoutSeparator = toFormat.slice(0, 3);

  const formatedDate = [...toFormatWithoutSeparator];

  for (let i = 0; i < formatedDate.length; i++) {
    if (formatedDate[i] === 'DD') {
      formatedDate[i] = day;
    } else if (formatedDate[i] === 'MM') {
      formatedDate[i] = month;
    } else if (formatedDate[i] === 'YY' && year.length === 2) {
      formatedDate[i] = year;
    } else if (formatedDate[i] === 'YY' && year.length === 4) {
      formatedDate[i] = year.split('').slice(2).join('');
    } else if (formatedDate[i] === 'YYYY' && year.length === 4) {
      formatedDate[i] = year;
    } else if (formatedDate[i] === 'YYYY' && year.length === 2) {
      if (year < 30) {
        year = `${20}` + year;
      } else {
        year = `${19}` + year;
      }
      formatedDate[i] = year;
    }
  }

  return formatedDate.join(separator);
};

module.exports = formatDate;
