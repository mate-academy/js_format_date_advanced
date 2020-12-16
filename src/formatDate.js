'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * key format. Create a `formatkey` function that accepts the `key` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given key in new format.
 *   The function can change a separator, reorder the key parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatkey(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatkey(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatkey(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatkey(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatkey(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} key
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatkey(date, fromFormat, toFormat) {
  const splited = date.split(fromFormat[3]);
  const yearIndex = fromFormat.indexOf('YYYY');
  const shortYearIndex = fromFormat.indexOf('YY');
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');
  const final = [];

  for (const key of toFormat) {
    if (key === 'DD') {
      final.push(splited[dayIndex]);
    }

    if (key === 'MM') {
      final.push(splited[monthIndex]);
    }

    if (key === 'YYYY') {
      if (splited[yearIndex]) {
        final.push(splited[yearIndex]);
      } else {
        if (+splited[shortYearIndex] > 20) {
          final.push(`19${splited[shortYearIndex]}`);
        } else {
          final.push(`20${splited[shortYearIndex]}`);
        }
      }
    }

    if (key === 'YY') {
      if (splited[shortYearIndex]) {
        final.push(splited[shortYearIndex]);
      } else {
        final.push(splited[yearIndex].slice(2));
      }
    }
  }

  return final.join(toFormat[3]);
}
module.exports = formatkey;
