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
  const arrayData = date.split(fromFormat[3]);
  const result = [];
  let year, month, day;

  fromFormat.map((item) => {
    switch (item) {
      case 'YY':
        year = arrayData.shift();
        break;

      case 'YYYY':
        year = arrayData.shift();
        break;

      case 'MM':
        month = arrayData.shift();
        break;

      case 'DD':
        day = arrayData.shift();
        break;
    }
  });

  toFormat.map((item) => {
    switch (item) {
      case 'YY':
        if (year.length === 2) {
          result.push(year);
        } else {
          result.push(year.slice(2));
        }
        break;

      case 'YYYY':
        if (year.length === 4) {
          result.push(year);
        } else {
          if (+year < 30) {
            result.push(+year + 2000 + '');
          } else {
            result.push(+year + 1900 + '');
          }
        }
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;
    }
  });

  return result.join(toFormat[3]);
}

module.exports = formatDate;
