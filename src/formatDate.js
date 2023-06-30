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
  const dateArr = date.split(fromFormat[3]);
  const dateObj = {};
  const currentYear = new Date().getFullYear().toString();

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  const fromYearFormat = toFormat.find((el) => el.startsWith('Y'));
  const toYearFormat = fromFormat.find((el) => el.startsWith('Y'));

  if (fromYearFormat.length === 4 && toYearFormat.length === 2) {
    dateObj[fromYearFormat]
      = dateObj[toYearFormat] * 1 > Number(currentYear.slice(-2))
        ? '19' + dateObj[toYearFormat]
        : '20' + dateObj[toYearFormat];
  }

  if (fromYearFormat.length === 2 && toYearFormat.length === 4) {
    dateObj[fromYearFormat] = dateObj[toYearFormat].slice(-2);
  }

  const properDateString = toFormat
    .slice(0, -1)
    .map((el) => dateObj[el])
    .join(toFormat[toFormat.length - 1]);

  return properDateString;
}

module.exports = formatDate;
