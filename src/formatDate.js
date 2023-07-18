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
  const currentSeporator = fromFormat[fromFormat.length - 1];
  const splitedCurrentDate = date.split(currentSeporator);
  const resultSeporator = toFormat[toFormat.length - 1];
  const resultDate = [];
  const currentDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        currentDate.day = splitedCurrentDate[i];
        break;
      case 'MM':
        currentDate.month = splitedCurrentDate[i];
        break;
      default:
        currentDate.year = splitedCurrentDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        resultDate.push(currentDate.day);
        break;
      case 'MM':
        resultDate.push(currentDate.month);
        break;
      case 'YY':
        resultDate.push(
          currentDate.year.length === 2
            ? currentDate.year
            : currentDate.year.slice(2)
        );
        break;
      case 'YYYY':
        resultDate.push(
          currentDate.year.length === 4
            ? currentDate.year
            : +currentDate.year < 30
              ? `20${currentDate.year}`
              : `19${currentDate.year}`
        );
    }
  }

  return resultDate.join(resultSeporator);
}

module.exports = formatDate;
