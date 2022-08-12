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
  const resultArr = Array(3);
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArr = date.split(oldSeparator);
  const dayPosition = fromFormat.findIndex(e => e.startsWith('D'));
  const monthPosition = fromFormat.findIndex(e => e.startsWith('M'));
  const yearPosition = fromFormat.findIndex(e => e.startsWith('Y'));
  const dayNewPosition = toFormat.findIndex(e => e.startsWith('D'));
  const monthNewPosition = toFormat.findIndex(e => e.startsWith('M'));
  const yearNewPosition = toFormat.findIndex(e => e.startsWith('Y'));

  if (fromFormat[yearPosition].length === 2
    && toFormat[yearNewPosition].length === 4) {
    dateArr[yearPosition] = (dateArr[yearPosition] < 30 ? 20 : 19)
    + dateArr[yearPosition];
  }

  resultArr[dayNewPosition] = dateArr[dayPosition];
  resultArr[monthNewPosition] = dateArr[monthPosition];

  resultArr[yearNewPosition]
    = (toFormat[yearNewPosition].length === 2
    && fromFormat[yearPosition].length === 4)
      ? dateArr[yearPosition].slice(2)
      : dateArr[yearPosition];

  return resultArr.join(newSeparator);
}

module.exports = formatDate;
