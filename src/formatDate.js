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

function getFormatIndexes(array, object) {
  array.forEach((value, index) => {
    if (index <= 2) {
      object[value] = index;
    }
  });
}

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const splittedDate = date.split(fromFormat[3]);
  const formattedDate = [];
  const CENTURY_CHANGE_YEAR = 30;

  const newIndexes = {};
  const oldIndexes = {};

  getFormatIndexes(fromFormat, oldIndexes);
  getFormatIndexes(toFormat, newIndexes);

  // In case of old format was with YY year, we changing our year
  // and its property name in oldIndexes object.

  if (oldIndexes.hasOwnProperty('YY') && newIndexes.hasOwnProperty('YYYY')) {
    splittedDate[oldIndexes.YY] = splittedDate[oldIndexes.YY]
    >= CENTURY_CHANGE_YEAR
      ? '19' + splittedDate[oldIndexes.YY]
      : '20' + splittedDate[oldIndexes.YY];
    oldIndexes['YYYY'] = oldIndexes['YY'];
    delete oldIndexes['YY'];
  } else if (oldIndexes.hasOwnProperty('YYYY')
  && newIndexes.hasOwnProperty('YY')) {
    // In case of old format was with YYYY year,
    // we changing our year and its property name in oldIndexes object.
    splittedDate[oldIndexes.YYYY] = splittedDate[oldIndexes.YYYY].slice(-2);
    oldIndexes['YY'] = oldIndexes['YYYY'];
    delete oldIndexes['YYYY'];
  }

  for (const key in newIndexes) {
    formattedDate[newIndexes[key]] = splittedDate[oldIndexes[key]];
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
