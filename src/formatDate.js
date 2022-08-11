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
  const arrDate = date.split(fromFormat[3]);
  const dateNew = [];
  let indYearStart = 0;
  let indYearEnd = 0;

  for (const part of fromFormat) {
    if (part.includes('Y')) {
      indYearStart = fromFormat.indexOf(part);
    }
  }

  for (const part of toFormat) {
    if (part.includes('Y')) {
      indYearEnd = toFormat.indexOf(part);
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let x = 0; x < 3; x++) {
      if (toFormat[i].slice(0, 2) === fromFormat[x].slice(0, 2)) {
        dateNew[i] = arrDate[x];
      }
    }
  }

  if (toFormat[indYearEnd].length < fromFormat[indYearStart].length) {
    dateNew[indYearEnd] = dateNew[indYearEnd].slice(2);
  }

  if (toFormat[indYearEnd].length > fromFormat[indYearStart].length) {
    dateNew[indYearEnd] = (dateNew[indYearEnd] < 30)
      ? '20' + dateNew[indYearEnd]
      : '19' + dateNew[indYearEnd];
  }

  return dateNew.join(toFormat[3]);
}

module.exports = formatDate;
