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
  const OldDate = date.split(fromFormat[3]);
  const newDate = [];
  const oldFormat = {};
  let year;

  for (let i = 0; i < 3; i++) {
    oldFormat[fromFormat[i]] = OldDate[i];
  }

  if (oldFormat.YYYY) {
    year = oldFormat.YYYY;
  } else {
    year = oldFormat.YY;
  }

  if (fromFormat.includes('YYYY') & toFormat.includes('YY')) {
    year = oldFormat.YYYY.slice(2);
  }

  if (fromFormat.includes('YY') & toFormat.includes('YYYY')) {
    if (year >= 30) {
      year = 19 + year;
    } else {
      year = 20 + year;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat.indexOf('DD') === i) {
      newDate.push(oldFormat.DD);
    }

    if (toFormat.indexOf('MM') === i) {
      newDate.push(oldFormat.MM);
    }

    if (toFormat.indexOf('YY') === i) {
      newDate.push(year);
    } else if (toFormat.indexOf('YYYY') === i) {
      newDate.push(year);
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
