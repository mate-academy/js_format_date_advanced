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
  // write code here
  const newSeparator = toFormat[3];
  const oldSeparator = fromFormat[3];
  const fromeDate = date.split(oldSeparator);
  const indexDay = fromFormat.indexOf('DD');
  const indexMonth = fromFormat.indexOf('MM');
  const indexLongYear = fromFormat.indexOf('YYYY');
  const indexShortYear = fromFormat.indexOf('YY');
  const result = [];

  for (let i = 0; i < fromeDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(fromeDate[indexDay]);
        break;

      case 'MM':
        result.push(fromeDate[indexMonth]);
        break;

      case 'YY':
        if (toFormat.indexOf('YY') === indexShortYear) {
          result.push(fromeDate[indexShortYear]);
        } else {
          result.push(fromeDate[indexLongYear].slice(2));
        }
        break;

      case 'YYYY':
        if (+fromeDate[indexShortYear] > 20) {
          result.push(`19${fromeDate[indexShortYear]}`);
        } else if (+fromeDate[indexShortYear] <= 30) {
          result.push(`20${fromeDate[indexShortYear]}`);
        } else {
          result.push(fromeDate[indexLongYear]);
        }
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
