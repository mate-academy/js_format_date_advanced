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
const YEAR_THRESHOLD = 30;
const SHORT_YEAR_PREFIX = '20';
const LONG_YEAR_PREFIX = '19';
const YEAR_PLACEHOLDER = 'Y';
const MONTH_PLACEHOLDER = 'M';
const DAY_PLACEHOLDER = 'D';

function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newDate = date.split(separator);
  const newSeparator = toFormat[toFormat.length - 1];
  const newFormat = [];

  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = newDate[i];
        break;
      case 'YY':
        year = newDate[i];

        if (year >= YEAR_THRESHOLD) {
          year = LONG_YEAR_PREFIX + year;
        } else {
          year = SHORT_YEAR_PREFIX + year;
        }
        break;
      case 'MM':
        month = newDate[i];
        break;
      case 'DD':
        day = newDate[i];
        break;
      default:
        break;
    }
  }

  for (const format of toFormat) {
    switch (format) {
      case 'YYYY':
        newFormat.push(year);
        break;
      case 'YY':
        newFormat.push(year.slice(-2));
        break;
      case 'MM':
        newFormat.push(month);
        break;
      case 'DD':
        newFormat.push(day);
        break;
      default:
        break;
    }
  }

  return newFormat.join(newSeparator);
}

module.exports = formatDate;
