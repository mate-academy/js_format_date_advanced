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
  const dateArr = date.split(fromFormat[3]);
  let year;
  let year2;
  let mounth;
  let day;
  let result = '';

  for (let i = 0; i <= 2; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = dateArr[i];
        break;

      case 'YY':
        year2 = dateArr[i];

        if (Number(year2) < 30) {
          year = '20' + year2;
        } else {
          year = '19' + year2;
        }
        break;

      case 'MM':
        mounth = dateArr[i];
        break;

      case 'DD':
        day = dateArr[i];
    }
  }

  for (let i = 0; i <= 2; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        result += year;

        if (i !== 2) {
          result += toFormat[3];
        }
        break;

      case 'YY':
        result += year.substr(2, 2);

        if (i !== 2) {
          result += toFormat[3];
        }
        break;

      case 'MM':
        result += mounth;

        if (i !== 2) {
          result += toFormat[3];
        }
        break;

      case 'DD':
        result += day;

        if (i !== 2) {
          result += toFormat[3];
        }
    }
  }

  return result;
}

module.exports = formatDate;
