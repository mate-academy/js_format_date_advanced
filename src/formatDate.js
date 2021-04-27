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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  let oldFormatOfYear = 0;
  let newFormatOfYear = 0;

  const oldMonth = fromFormat.indexOf('MM');
  const oldDay = fromFormat.indexOf('DD');
  let oldYear = 0;

  if (fromFormat.includes('YY')) {
    oldYear = fromFormat.indexOf('YY');
    oldFormatOfYear = 2;
  } else {
    oldYear = fromFormat.indexOf('YYYY');
    oldFormatOfYear = 4;
  }

  const newMonth = toFormat.indexOf('MM');
  const newDay = toFormat.indexOf('DD');
  let newYear = 0;

  if (toFormat.includes('YY')) {
    newYear = toFormat.indexOf('YY');
    newFormatOfYear = 2;
  } else {
    newYear = toFormat.indexOf('YYYY');
    newFormatOfYear = 4;
  }

  const dateArr = date.split(oldSeparator);
  const result = [];

  result[newDay] = dateArr[oldDay];
  result[newMonth] = dateArr[oldMonth];
  result[newYear] = dateArr[oldYear];

  if (oldFormatOfYear < newFormatOfYear) {
    if (result[newYear] > 21) {
      result[newYear] = result[newYear].padStart(4, '19');
    }
    result[newYear] = result[newYear].padStart(4, '20');
  } else if (oldFormatOfYear > newFormatOfYear) {
    result[newYear] = result[newYear].slice(2, 4);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
