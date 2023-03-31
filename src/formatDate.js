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
  const inputSeparator = fromFormat[fromFormat.length - 1];
  const inputDateComponents = date.split(inputSeparator);

  const outputSeparator = toFormat[toFormat.length - 1];
  const outputDateComponents = [];

  let day = '';
  let month = '';
  let year = '';
  let previousYearFormat = '';

  dateFactory();
  formatFactory();

  return outputDateComponents.join(outputSeparator);

  function dateFactory() {
    for (let i = 0; i < fromFormat.length - 1; i++) {
      if (fromFormat[i] === 'DD') {
        day = inputDateComponents[i];
      } else if (fromFormat[i] === 'MM') {
        month = inputDateComponents[i];
      } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
        year = inputDateComponents[i];
        previousYearFormat = fromFormat[i];
      }
    }
  }

  function formatFactory() {
    for (let i = 0; i < toFormat.length - 1; i++) {
      if (toFormat[i] === 'DD') {
        outputDateComponents.push(day);
      } else if (toFormat[i] === 'MM') {
        outputDateComponents.push(month);
      } else if (toFormat[i] === previousYearFormat) {
        outputDateComponents.push(year);
      } else if (toFormat[i] === 'YY' && previousYearFormat === 'YYYY') {
        outputDateComponents.push(year.slice(-2));
      } else {
        const prefix = year < 30 ? '20' : '19';

        outputDateComponents.push(prefix + year);
      }
    }
  }
}

module.exports = formatDate;
