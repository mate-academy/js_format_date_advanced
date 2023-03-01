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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const fromArr = date.split(oldSeparator);
  const lastIndex = toFormat.length - 1;

  const getItem = (mask) =>
    fromArr[fromFormat.findIndex((item) => item.includes(mask))];
  const oldDay = getItem('D');
  const oldMonth = getItem('M');
  const oldYear = getItem('Y');

  const result = [];

  for (let i = 0; i < lastIndex; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(oldDay);
        break;

      case 'MM':
        result.push(oldMonth);
        break;

      case 'YY':
        const yearWithTwoChars = oldYear.length === 2
          ? oldYear
          : oldYear.toString().slice(-2);

        result.push(yearWithTwoChars);
        break;

      case 'YYYY':
        const year = oldYear.length === 4
          ? oldYear
          : (+oldYear >= 30 ? 19 : 20) + oldYear;

        result.push(year);
        break;

      default:
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
