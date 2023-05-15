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
  const fromDateFormatSeparator = fromFormat[fromFormat.length - 1];
  const toDateFormatSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromDateFormatSeparator);
  const dateFormatted = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      const day = dateParts[i];

      dateFormatted[toFormat.indexOf('DD')] = day;
    }

    if (fromFormat[i] === 'MM') {
      const month = dateParts[i];

      dateFormatted[toFormat.indexOf('MM')] = month;
    }

    if (fromFormat[i] === 'YYYY') {
      const year = dateParts[i];

      if (toFormat.indexOf('YYYY') !== -1) {
        dateFormatted[toFormat.indexOf('YYYY')] = year;
      }

      dateFormatted[toFormat.indexOf('YY')] = year.slice(2);
    }

    if (fromFormat[i] === 'YY') {
      const year = dateParts[i];

      if (toFormat.indexOf('YY') !== -1) {
        dateFormatted[toFormat.indexOf('YY')] = year;
      }

      const yearPrefix = year < 30
        ? '20'
        : '19';

      dateFormatted[toFormat.indexOf('YYYY')] = yearPrefix + year;
    }
  }

  return dateFormatted.join(toDateFormatSeparator);
}

module.exports = formatDate;
