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
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const dateOldFormat = date.split(oldSeparator);

  const oldDateMap = new Map();
  const newDateMap = new Map();

  for (let i = 0; i < fromFormat.length; i++) {
    oldDateMap.set(fromFormat[i], dateOldFormat[i]);
  }

  for (const prop of toFormat) {
    newDateMap.set(prop, oldDateMap.get(prop));
  }

  if (newDateMap.has('YY') && newDateMap.get('YY') === undefined) {
    newDateMap.set('YY', oldDateMap.get('YYYY').split('').slice(-2).join(''));
  }

  if (newDateMap.has('YYYY') && newDateMap.get('YYYY') === undefined) {
    if (oldDateMap.get('YY') < 30) {
      newDateMap.set('YYYY', '20' + oldDateMap.get('YY'));
    } else {
      newDateMap.set('YYYY', '19' + oldDateMap.get('YY'));
    }
  }

  return Array.from(newDateMap.values()).join(newSeparator);
}

module.exports = formatDate;
