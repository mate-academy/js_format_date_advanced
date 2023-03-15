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
  const day = 'DD';
  const month = 'MM';
  const year = 'YYYY';
  const shortYear = 'YY';

  let oldYear = fromFormat.indexOf(year);
  const oldMonth = fromFormat.indexOf(month);
  const oldDay = fromFormat.indexOf(day);

  let newYear = toFormat.indexOf(year);
  const newMonth = toFormat.indexOf(month);
  const newDay = toFormat.indexOf(day);

  const splitedArr = date.split(fromFormat[3]);
  const newArr = Array(3);

  newArr[newMonth] = splitedArr[oldMonth];
  newArr[newDay] = splitedArr[oldDay];
  newArr[newYear] = splitedArr[oldYear];

  if (fromFormat.includes(shortYear) && toFormat.includes(year)) {
    oldYear = fromFormat.indexOf(shortYear);

    if (splitedArr[oldYear] < 30) {
      newArr[newYear] = `20${splitedArr[oldYear]}`;
    } else {
      newArr[newYear] = `19${splitedArr[oldYear]}`;
    }
  }

  if (fromFormat.includes(year) && toFormat.includes(shortYear)) {
    newYear = toFormat.indexOf(shortYear);

    newArr[newYear] = splitedArr[oldYear].slice(2);
  }

  const result = newArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
