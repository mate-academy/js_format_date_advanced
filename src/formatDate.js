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
  const initialSeparator = fromFormat[3];
  const targetSeparator = toFormat[3];

  const dateChunks = date.split(initialSeparator);
  const formattedChunks = [];

  for (let i = 0; i < dateChunks.length; i++) {
    let targetIndex = toFormat.indexOf(fromFormat[i]);
    let dateChunk = dateChunks[i];

    if (targetIndex === -1) {
      targetIndex = Math.max(toFormat.indexOf('YY'), toFormat.indexOf('YYYY'));
      dateChunk = formatYear(dateChunk);
    }

    formattedChunks[targetIndex] = dateChunk;
  }

  return formattedChunks.join(targetSeparator);
}

function formatYear(year) {
  if (year.length === 4) {
    return year.slice(-2);
  }

  if (+year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

module.exports = formatDate;
