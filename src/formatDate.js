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
  const main = date.split(fromFormat[3]);
  const indexFrom = fromFormat.indexOf('YY');
  const indexLongFrom = fromFormat.indexOf('YYYY');
  const indexTo = toFormat.indexOf('YY');
  const indexLongTo = toFormat.indexOf('YYYY');
  const indexMonthFrom = fromFormat.indexOf('MM');
  const indexMonthTo = toFormat.indexOf('MM');
  const indexDayFrom = fromFormat.indexOf('DD');
  const indexDayTo = toFormat.indexOf('DD');

  const year = 'YY';
  const longYear = 'YYYY';

  const correctIndexFrom = indexFrom < 0 ? indexLongFrom : indexFrom;
  const correctIndexTo = indexTo < 0 ? indexLongTo : indexTo;

  let data = main[correctIndexFrom];

  // step 1

  if (fromFormat[correctIndexFrom] === longYear
    && toFormat[correctIndexTo] === year) {
    data = main[correctIndexFrom].slice(2);
  }

  if (fromFormat[correctIndexFrom] === year
    && toFormat[correctIndexTo] === longYear) {
    if (Number(main[correctIndexFrom]) < 30) {
      data = '20' + main[correctIndexFrom];
    }

    if (Number(main[correctIndexFrom]) >= 30) {
      data = '19' + main[correctIndexFrom];
    }
  }

  // step 2

  const replacement = [...main];

  replacement[correctIndexTo] = data;
  replacement[indexMonthTo] = main[indexMonthFrom];
  replacement[indexDayTo] = main[indexDayFrom];

  return replacement.join(toFormat[3]);
}

module.exports = formatDate;
