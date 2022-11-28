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
 */

// console.clear();

function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const firstDate = {};
  const oldFormat = date.split(fromFormat[3]);

  const fullYear = 'YYYY';
  const partialYear = 'YY';

  for (let i = 0; i < fromFormat.length - 1; ++i) {
    if (fromFormat[i] === fullYear) {
      firstDate[fullYear] = oldFormat[i];
    }

    if (fromFormat[i] === partialYear) {
      firstDate[fullYear] = oldFormat[i] < 30
        ? 20 + oldFormat[i]
        : 19 + oldFormat[i];
    }

    firstDate[fromFormat[i]] = oldFormat[i];
  }

  for (let i = 0; i < fromFormat.length - 1; ++i) {
    switch (toFormat[i]) {
      case 'DD':
        formatedDate.push(firstDate[toFormat[i]]);
        break;

      case 'MM':
        formatedDate.push(firstDate[toFormat[i]]);
        break;

      case 'YY':
        formatedDate.push(firstDate[fullYear].slice(2));
        break;

      case 'YYYY':
        formatedDate.push(firstDate[toFormat[i]]);
        break;

      default:
        throw new Error();
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
