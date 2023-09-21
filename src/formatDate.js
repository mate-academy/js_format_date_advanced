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
  const separator = toFormat[toFormat.length - 1];
  const dateArray = date.split(fromFormat[3]);
  const objectDate = {};
  const result = [];
  const fullYear = 'YYYY';
  const partYear = 'YY';

  for (let i = 0; i < 3; i++) {
    objectDate[fromFormat[i]] = dateArray[i];
  }

  if (Object.hasOwn(objectDate, partYear)) {
    if (objectDate[partYear] < 30) {
      objectDate[fullYear] = `20${objectDate[partYear]}`;
    }

    if (objectDate[partYear] >= 30) {
      objectDate[fullYear] = `19${objectDate[partYear]}`;
    }
  } else if (Object.hasOwn(objectDate, fullYear)) {
    objectDate[partYear] = objectDate[fullYear].slice(2);
  }

  for (let i = 0; i < 3; i++) {
    result[i] = objectDate[toFormat[i]];
  }

  return result.join(separator);

}

module.exports = formatDate;
