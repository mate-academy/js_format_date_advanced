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
  const newDate = date.split(fromFormat[3]);
  const toSeparate = toFormat[3];
  const resultDate = [];
  let month = '';
  let day = '';
  let year = '';

  for (let i = 0; i < newDate.length; i++) {
    switch (fromFormat[i]) {
      case 'MM':
        month = newDate[i];
        break;

      case 'DD':
        day = newDate[i];
        break;

      case 'YY':
      case 'YYYY':
        year = newDate[i];
        break;
    }
  }

  for (let i = 0; i < newDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        resultDate[i] = day;
        break;

      case 'MM':
        resultDate[i] = month;
        break;

      case 'YY':
        if (year.length === 4) {
          resultDate[i] = year.slice(-2);
        }
        break;

      case 'YYYY':
        if (year.length === 2 && +year < 30) {
          resultDate[i] = '20' + year;
          break;
        }

        if (year.length === 2) {
          resultDate[i] = '19' + year;
        } else {
          resultDate[i] = year;
        }
        break;
    }
  }

  return resultDate.join(toSeparate);
}

module.exports = formatDate;
