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
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const arrDate = date.split(fromSeparator);
  const result = [];

  if (toFormat.join('').length !== fromFormat.join('').length) {
    for (let i = 0; i < 3; i++) {
      const value = fromFormat[i];

      switch (true) {
        case value === 'YY' && +arrDate[i] >= 30:
          arrDate.unshift('19' + arrDate[i]);
          fromFormat.unshift('YYYY');
          break;

        case value === 'YY' && +arrDate[i] < 30:
          arrDate.unshift('20' + arrDate[i]);
          fromFormat.unshift('YYYY');
          break;

        case value.length === 4:
          fromFormat.unshift('YY');
          arrDate.unshift(arrDate[i].slice(2));
          break;
      }
    }
  }

  for (let toIndex = 0; toIndex < toFormat.length - 1; toIndex++) {
    for (let fromIndex = 0; fromIndex < fromFormat.length - 1; fromIndex++) {
      if (toFormat[toIndex] === fromFormat[fromIndex]) {
        result.push(arrDate[fromIndex]);
        break;
      }
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
