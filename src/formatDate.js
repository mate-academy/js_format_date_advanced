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
  const separator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const splitedDate = date.split(separator);
  const newDate = [];
  const yearShort = splitedDate[fromFormat.indexOf('YY')];
  const yearLong = splitedDate[fromFormat.indexOf('YYYY')];
  const month = splitedDate[fromFormat.indexOf('MM')];
  const day = splitedDate[fromFormat.indexOf('DD')];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newDate.push(day);
    } else if (toFormat[i] === 'MM') {
      newDate.push(month);
    } else if (toFormat[i] === 'YYYY' && fromFormat.includes('YYYY')) {
      newDate.push(yearLong);
    } else if (toFormat[i] === 'YYYY' && yearShort < 30) {
      newDate.push(`20${yearShort}`);
    } else if (toFormat[i] === 'YYYY' && yearShort >= 30) {
      newDate.push(`19${yearShort}`);
    } else if (toFormat[i] === 'YY' && fromFormat.includes('YY')) {
      newDate.push(yearShort);
    } else {
      newDate.push(yearLong.slice(-2));
    }
  }

  return (newDate.join(newSeparator));
}
module.exports = formatDate;
