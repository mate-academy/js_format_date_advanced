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
  const oldSpliter = fromFormat[3];
  const newSpliter = toFormat[3];
  const time = {};
  const rezult = [];
  const twentyCentury = '19';
  const twentyOneCentury = '20';
  const halfCentury = '30';

  const oldData = date.split(oldSpliter);

  for (let i = 0; i < 3; i++) {
    time[fromFormat[i]] = oldData[i];
  }

  if (time.YY) {
    if (time.YY < halfCentury) {
      (time.YYYY = twentyOneCentury + time.YY);
    } else {
      (time.YYYY = twentyCentury + time.YY);
    }
  }

  if (time.YYYY) {
    time.YY = time.YYYY.slice(2);
  }

  for (let i = 0; i < 3; i++) {
    rezult.push(time[toFormat[i]]);
  }

  return rezult.join(newSpliter);
}

module.exports = formatDate;
