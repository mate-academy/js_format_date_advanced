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

  const oldDay = fromArr[fromFormat.findIndex((item) => item.includes('D'))];
  const oldMonth = fromArr[fromFormat.findIndex((item) => item.includes('M'))];
  const oldYear = fromArr[fromFormat.findIndex((item) => item.includes('Y'))];

  const result = [];

  for (let i = 0; i < lastIndex; i++) {
    let current = '';

    switch (toFormat[i]) {
      case 'DD':
        current = oldDay;
        break;

      case 'MM':
        current = oldMonth;
        break;

      case 'YY':
        current = oldYear.length > 2
          ? current = oldYear.slice(2)
          : current = oldYear;
        break;

      case 'YYYY':
        if (oldYear.length < 4) {
          current = Number(oldYear >= 30)
            ? current = String(19 + oldYear)
            : current = String(20 + oldYear);
          break;
        }

        current = oldYear;
        break;

      default:
        break;
    }
    result.push(current);
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
