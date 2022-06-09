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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateArray = date.split(oldSeparator);
  const format = {};

  for (let item = 0; item < dateArray.length; item++) {
    const dateItem = fromFormat[item];

    if (dateItem === 'YY' && toFormat[item] === 'YYYY') {
      toFormat[item] = 'YY';

      if (dateArray[item] < 30) {
        dateArray[item] = `20${dateArray[item]}`;
      } else {
        dateArray[item] = `19${dateArray[item]}`;
      }

      format[dateItem] = dateArray[item];
    } else if (dateItem === 'YYYY' && toFormat[item] === 'YY') {
      toFormat[item] = 'YYYY';

      format[dateItem] = String(dateArray[item]).slice(2);
    } else {
      format[dateItem] = dateArray[item];
    }
  }

  return `${format[toFormat[0]]}${newSeparator}${format[toFormat[1]]}${newSeparator}${format[toFormat[2]]}`;
}

module.exports = formatDate;
