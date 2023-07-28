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
  const formatedDate = Array(3).fill();
  const dateArr = date.split(fromFormat[3]);

  formatedDate[fromToIndex('Y')[1]] = toYear(dateArr, fromFormat, toFormat);
  formatedDate[fromToIndex('M')[1]] = dateArr[fromToIndex('M')[0]];
  formatedDate[fromToIndex('D')[1]] = dateArr[fromToIndex('D')[0]];

  function fromToIndex(letters) {
    const fromIndex = fromFormat.indexOf(fromFormat.filter(el =>
      el.includes(letters))[0]);
    const toIndex = toFormat.indexOf(toFormat.filter(el =>
      el.includes(letters))[0]);

    return [fromIndex, toIndex];
  }

  function toYear(year, from, to) {
    if (from[fromToIndex('Y')[0]].length < to[fromToIndex('Y')[1]].length) {
      return year[fromToIndex('Y')[0]] < 30 ? `20${year[fromToIndex('Y')[0]]}`
        : `19${year[fromToIndex('Y')[0]]}`;
    }

    if (from[fromToIndex('Y')[0]].length > to[fromToIndex('Y')[1]].length) {
      return year[fromToIndex('Y')[0]].slice(2);
    }

    return year[fromToIndex('Y')[0]];
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
