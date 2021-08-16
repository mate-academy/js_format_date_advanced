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
  const arr = {};

  const [,,, d] = fromFormat;
  const [,,, e] = toFormat;
  const data = date.split(d);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' && data[i] < 30) {
      arr.YYYY = 20 + data[i];
    };

    if (fromFormat[i] === 'YY' && data[i] >= 30) {
      arr.YYYY = 19 + data[i];
    } else {
      arr[fromFormat[i]] = data[i];
    };
  };

  toFormat.pop();

  const arra = {};

  for (const key of toFormat) {
    arra[key] = arr[key];

    if (key === 'YY') {
      arra['YY'] = arr.YYYY.slice(2);
    };
    // console.log(key, arra);
  };

  const y = Object.values(arra);

  const result = y.join(e);

  return result;
};

module.exports = formatDate;
