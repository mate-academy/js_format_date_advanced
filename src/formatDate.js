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
  const oldDateArray = date.split(fromFormat[3]);
  const newDateArray = Array(3);

  newDateArray[toFormat.indexOf('DD')]
    = oldDateArray[fromFormat.indexOf('DD')];

  newDateArray[toFormat.indexOf('MM')]
    = oldDateArray[fromFormat.indexOf('MM')];

  if (toFormat.includes('YY')) {
    const newYear = (fromFormat.includes('YY'))
      ? oldDateArray[fromFormat.indexOf('YY')]
      : oldDateArray[fromFormat.indexOf('YYYY')].slice(2);

    newDateArray[toFormat.indexOf('YY')] = newYear;
  }

  if (toFormat.includes('YYYY')) {
    let newYear;

    if (fromFormat.includes('YYYY')) {
      newYear = oldDateArray[fromFormat.indexOf('YYYY')];
    } else {
      if (+oldDateArray[fromFormat.indexOf('YY')] < 30) {
        newYear = '20' + oldDateArray[fromFormat.indexOf('YY')];
      } else {
        newYear = '19' + oldDateArray[fromFormat.indexOf('YY')];
      }
    }

    newDateArray[toFormat.indexOf('YYYY')] = newYear;
  }

  return newDateArray.join(toFormat[3]);
}

module.exports = formatDate;
