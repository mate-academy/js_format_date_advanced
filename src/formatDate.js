/* eslint-disable no-unused-expressions */
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
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dataFormatFrom = fromFormat.slice(0, 3);
  const dataFormatTo = toFormat.slice(0, 3);
  const dataWithoutSeparator = date.split(`${separatorFrom}`);
  const dateObj = {};

  for (let i = 0; i < dataWithoutSeparator.length; i++) {
    dateObj[dataFormatFrom[i]] = dataWithoutSeparator[i];
  }

  const newDateParts = [];

  for (let i = 0; i < dataWithoutSeparator.length; i++) {
    if (dataFormatTo[i] === 'YYYY') {
      let year = dateObj['YYYY'] || dateObj['YY'];

      if (year.length === 2) {
        year < 30 ? (year = '20' + year) : (year = '19' + year);
      }
      newDateParts.push(year);
    } else if (dataFormatTo[i] === 'YY') {
      const year = (dateObj['YYYY'] || dateObj['YY']).slice(2);

      newDateParts.push(year);
    } else {
      newDateParts.push(dateObj[dataFormatTo[i]]);
    }
  }

  return newDateParts.join(separatorTo);
}

module.exports = formatDate;
