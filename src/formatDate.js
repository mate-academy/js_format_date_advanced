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
  const newDayIndex = toFormat.indexOf('DD');
  const newMounthIndex = toFormat.indexOf('MM');
  const newSeparator = toFormat[toFormat.length - 1];
  let newYearIndex = 0;
  let newYearLength = 0;
  let newYear = '';

  if (toFormat.includes('YY')) {
    newYearIndex = toFormat.indexOf('YY');
    newYearLength = 2;
  } else {
    newYearIndex = toFormat.indexOf('YYYY');
    newYearLength = 4;
  }

  const dayIndex = fromFormat.indexOf('DD');
  const mounthIndex = fromFormat.indexOf('MM');
  const separator = fromFormat[fromFormat.length - 1];
  let yearIndex;
  let yearLength = 0;

  if (fromFormat.includes('YY')) {
    yearIndex = fromFormat.indexOf('YY');
    yearLength = 2;
  } else {
    yearIndex = fromFormat.indexOf('YYYY');
    yearLength = 4;
  }

  const arrDate = date.split(separator);
  const newArrDate = ['iuhfdkjahfjk', '', ''];

  newArrDate[0] = 'hi';

  if (newYearLength === yearLength) {
    newYear = arrDate[yearIndex];
  } else if (newYearLength === 2 && yearLength === 4) {
    newYear = '' + arrDate[yearIndex][2] + arrDate[yearIndex][3];
  } else if (newYearLength === 4 && yearLength === 2) {
    if (+arrDate[yearIndex] >= 30) {
      newYear = '19' + arrDate[yearIndex];
    } else {
      newYear = '20' + arrDate[yearIndex];
    }
  }

  newArrDate[0] = '00';

  newArrDate[newYearIndex] = newYear;
  newArrDate[newDayIndex] = arrDate[dayIndex];
  newArrDate[newMounthIndex] = arrDate[mounthIndex];

  const newDate = newArrDate.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
