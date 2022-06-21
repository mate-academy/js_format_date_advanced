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
  const newDateFormat = [];
  const daysFrom = date.split(fromFormat[3]);
  const separator = toFormat[3];

  const findDayPart = x => daysFrom[fromFormat.indexOf(x)];

  const yearFullFormal = findDayPart('YY') < 30
    ? '20' + findDayPart('YY')
    : '19' + findDayPart('YY');

  for (const dayPart of toFormat) {
    switch (dayPart) {
      case 'DD':
        newDateFormat.push(findDayPart('DD'));
        break;

      case 'MM':
        newDateFormat.push(findDayPart('MM'));
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          newDateFormat.push(findDayPart('YY'));
        } else {
          newDateFormat.push(findDayPart('YYYY').slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          newDateFormat.push(findDayPart('YYYY'));
        } else {
          newDateFormat.push(yearFullFormal);
        }

        break;
    }
  }

  return newDateFormat.join(separator);
}

module.exports = formatDate;
