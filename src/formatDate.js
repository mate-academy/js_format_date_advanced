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
  const [separatorOld, ...oldFormat] = fromFormat.reverse();
  const [separatorNew, ...newFormat] = toFormat.reverse();
  const time = date.split(separatorOld);

  oldFormat.reverse();
  newFormat.reverse();

  if (oldFormat.includes('YY') && newFormat.includes('YYYY')) {
    const index = oldFormat.indexOf('YY');

    if (time[index] >= 30) {
      time[index] = '19' + time[index];
    } else {
      time[index] = '20' + time[index];
    }

    oldFormat[oldFormat.indexOf('YY')] = 'YYYY';
  }

  if (oldFormat.includes('YYYY') && newFormat.includes('YY')) {
    const index = oldFormat.indexOf('YYYY');

    time[index] = +(time[index].toString().slice(2, 4));
    oldFormat[oldFormat.indexOf('YYYY')] = 'YY';
  }

  const oldFormatOnject = {};

  for (const x in oldFormat) {
    oldFormatOnject[oldFormat[x]] = time[x];
  }

  const newFormatObject = {};

  for (const x in newFormat) {
    newFormatObject[newFormat[x]] = oldFormatOnject[newFormat[x]];
  }

  return Object.values(newFormatObject).join(separatorNew);
};

module.exports = formatDate;
