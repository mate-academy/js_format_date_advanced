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
  const newDate = [];
  const oldDate = date.split(fromFormat[3]);
  const yearWasIndex = yearIndex(fromFormat);
  const yearWillBeIndex = yearIndex(toFormat);

  if (oldDate[yearWasIndex].length > toFormat[yearWillBeIndex].length) {
    oldDate[yearWasIndex] = oldDate[yearWasIndex].slice(2);
    fromFormat[yearWasIndex] = toFormat[yearWillBeIndex];
  }

  if (oldDate[yearWasIndex].length < toFormat[yearWillBeIndex].length) {
    if (oldDate[yearWasIndex] < 30) {
      oldDate[yearWasIndex] = '20' + oldDate[yearWasIndex];
    } else {
      oldDate[yearWasIndex] = '19' + oldDate[yearWasIndex];
    }

    fromFormat[yearWasIndex] = toFormat[yearWillBeIndex];
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === fromFormat[0]) {
      newDate[i] = oldDate[0];
    }

    if (toFormat[i] === fromFormat[1]) {
      newDate[i] = oldDate[1];
    }

    if (toFormat[i] === fromFormat[2]) {
      newDate[i] = oldDate[2];
    }
  }

  function yearIndex(format) {
    let index = format.indexOf('YY');

    if (index < 0) {
      index = format.indexOf('YYYY');
    }

    return index;
  }

  return (newDate.join(toFormat[3]));
}

module.exports = formatDate;
