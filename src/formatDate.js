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
  const splitedDate = date.split(fromFormat[3]);
  const bigYearIndex = fromFormat.indexOf('YYYY');
  const tinyYearIndex = fromFormat.indexOf('YY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');
  const newDate = [];

  for (let i = 0; i < splitedDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate.push(splitedDate[dayIndex]);
        break;
      case 'MM':
        newDate.push(splitedDate[monthIndex]);
        break;
      case 'YY':
        if (toFormat.indexOf('YY') > -1 && tinyYearIndex > -1) {
          newDate.push(splitedDate[tinyYearIndex]);
        } else {
          newDate.push(splitedDate[bigYearIndex].slice(2));
        }
        break;
      case 'YYYY':
        if (+splitedDate[tinyYearIndex] > 20) {
          newDate.push(`19${splitedDate[tinyYearIndex]}`);
        } else if (+splitedDate[tinyYearIndex] <= 30) {
          newDate.push(`20${splitedDate[tinyYearIndex]}`);
        } else {
          newDate.push(splitedDate[bigYearIndex]);
        }
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
