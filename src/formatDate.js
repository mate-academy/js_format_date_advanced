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
  let year;
  let month;
  let day;
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const fromArray = date.split(fromSeparator);
  const resultArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const current = fromArray[i];

    switch (fromFormat[i]) {
      case 'DD':
        day = current;
        break;

      case 'MM':
        month = current;
        break;

      case 'YY':
        year = current;
        break;

      case 'YYYY':
        year = current;
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    let current;

    switch (toFormat[i]) {
      case 'DD':
        current = day;
        break;

      case 'MM':
        current = month;
        break;

      case 'YY':
        if (year.length === 4) {
          year = year.slice(-2);
        }
        current = year;
        break;

      case 'YYYY':
        if (year.length === 2) {
          if (+year < 30) {
            year = '20' + year;
          } else {
            year = '19' + year;
          }
        }
        current = year;
        break;

      default:
        break;
    }

    resultArray.push(current);
  }

  return resultArray.join(toSeparator);
}

module.exports = formatDate;
