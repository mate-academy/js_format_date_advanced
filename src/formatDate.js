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

const YY = 'YY';
const YYYY = 'YYYY';

function formatDate(date, fromFormat, toFormat) {
  const objDate = {};
  const arrDateResult = [];
  const delimiterFromFormat = fromFormat[3];
  const delimiterToFormat = toFormat[3];
  const arrDate = date.split(delimiterFromFormat);

  arrDate.map((item, i) => {
    objDate[fromFormat[i]] = item;
  });

  const keysDate = Object.keys(objDate);

  toFormat.map((item, i) => {
    if (item === YY && !keysDate.includes(item)) {
      arrDateResult.push((objDate[YYYY]).slice(2));

      return true;
    }

    if (item === YYYY && !keysDate.includes(item)) {
      const year = `${objDate[YY] < 30 ? 20 : 19}${objDate[YY]}`;

      arrDateResult.push(year);

      return true;
    }

    if (keysDate.includes(item)) {
      arrDateResult.push(objDate[item]);
    }
  });

  return arrDateResult.join(delimiterToFormat);
}

module.exports = formatDate;
