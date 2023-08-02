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
  const dateArray = date.split(fromFormat[3]);
  const newDateArray = [];

  formatYear(fromFormat, toFormat, dateArray);

  for (let i = 0; i < dateArray.length; i++) {
    newDateArray[i] = dateArray[fromFormat.indexOf(toFormat[i])];
  }

  return newDateArray.join(toFormat[3]);
}

function formatYear(fromFormat, toFormat, dateArray) {
  const fromYearIndex = fromFormat.indexOf('YY')
  + fromFormat.indexOf('YYYY') + 1;
  const toYearIndex = toFormat.indexOf('YY') + toFormat.indexOf('YYYY') + 1;

  if (fromFormat[fromYearIndex] === toFormat[toYearIndex]) {
    return;
  }

  fromFormat[fromYearIndex] = toFormat[toYearIndex];

  if (fromFormat[fromYearIndex] === 'YYYY') {
    if (+dateArray[fromYearIndex] < 30) {
      dateArray[fromYearIndex] = '20' + dateArray[fromYearIndex];

      return;
    }
    dateArray[fromYearIndex] = '19' + dateArray[fromYearIndex];

    return;
  }

  dateArray[fromYearIndex] = dateArray[fromYearIndex].slice(2);
}

module.exports = formatDate;
