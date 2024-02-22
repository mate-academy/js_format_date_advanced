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
  // write code here
  let splitDate = date.split(fromFormat[3]);
  let year = 0;
  let month = 0;
  let day = 0;


  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = splitDate[i];
    };
  };

  let yearLengthTo = 0;
  let yearLengthFrom = 0;
  for (const ch of toFormat) {
    if (ch === 'YY' || ch === 'YYYY') {
      yearLengthTo = ch.length;
    };
  };

  for (const ch of fromFormat) {
    if (ch === 'YY' || ch === 'YYYY') {
      yearLengthFrom = ch.length;
    };
  };

  if (yearLengthTo < yearLengthFrom) {
    year = year.slice(2);
  };

  if (yearLengthTo > yearLengthFrom) {
    if (year >= 30) {
      year = 1900 + +year;
    };

    if (year < 30) {
      year = 2000 + +year;
    };
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    };
  };

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    };
  };

  const newFormat = [];

  for (const ch of toFormat) {
    switch (ch) {
      case 'YY':
        newFormat.push(year);
        break;

      case 'YYYY':
        newFormat.push(year);
        break;

      case 'MM':
        newFormat.push(month);
        break;

      case 'DD':
        newFormat.push(day);
        break;

      default:
        break;
    };
  };

  const newDate = newFormat.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
