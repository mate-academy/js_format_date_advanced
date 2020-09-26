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
  const fromSepatator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const splitedDate = date.split(fromSepatator);

  const dateToFormat = {};
  const newFormatDate = [];

  for (let formatPoint = 0; formatPoint < fromFormat.length; formatPoint++) {
    dateToFormat[fromFormat[formatPoint][0]] = splitedDate[formatPoint];
  }

  const dateYearToFormat = dateToFormat['Y'];

  for (const format of toFormat) {
    if (format[0] === 'Y' && format.length !== dateYearToFormat.length) {
      if (format.length === 4) {
        if (dateYearToFormat >= 30) {
          newFormatDate.push(19 + dateYearToFormat);
        } else {
          newFormatDate.push(20 + dateYearToFormat);
        }
      } else {
        newFormatDate.push(dateYearToFormat.slice(2));
      }
    } else {
      newFormatDate.push(dateToFormat[format[0]]);
    }
  }

  const newFormatDateString = newFormatDate.join(toSeparator);

  return newFormatDateString;
}

module.exports = formatDate;
