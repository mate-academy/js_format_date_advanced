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
  const fromFormatSeparator = fromFormat[3];
  const toFormatSeparator = toFormat[3];
  const elements = date.split(fromFormatSeparator);
  const obj = {};
  const newMasiv = [];

  for (let i = 0; i <= elements.length - 1; i++) {
    const value = fromFormat[i];

    obj[value] = elements[i];
  }

  for (let e = 0; e < toFormat.length - 1; e++) {
    const key = toFormat[e];

    if (key === 'YY' && obj[key] === undefined) {
      const fullDate = obj['YYYY'];

      const shortDate = fullDate.slice(2, 4);

      newMasiv.push(shortDate);
    } else if (key === 'YYYY' && obj[key] === undefined) {
      let shortDate = obj['YY'];

      if (shortDate >= 30) {
        shortDate = 19 + shortDate;
      }

      if (shortDate < 30) {
        shortDate = 20 + shortDate;
      }

      newMasiv.push(shortDate);
    } else {
      newMasiv.push(obj[key]);
    }
  }

  const result = newMasiv.join(toFormatSeparator);

  return result;
}

module.exports = formatDate;
