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

const YEAR_FORMAT_BIG = 'YYYY';
const YEAR_FORMAT_SMALL = 'YY';
const MONTH_FORMAT = 'MM';
const DAY_FORMAT = 'DD';

function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const yearIndex = fromFormat.indexOf(YEAR_FORMAT_BIG) === -1
    ? fromFormat.indexOf(YEAR_FORMAT_SMALL)
    : fromFormat.indexOf(YEAR_FORMAT_BIG);
  const year = dateParts[yearIndex];
  const yearShort = year.slice(-2);
  const formattedDate = [];

  toFormat.forEach((item) => {
    if (item === YEAR_FORMAT_SMALL) {
      formattedDate.push(yearShort);
    }

    if (item === YEAR_FORMAT_BIG) {
      const formattedYear = Number(yearShort) < 30 ? `20${yearShort}` : `19${yearShort}`;

      formattedDate.push(formattedYear);
    }

    if (item === DAY_FORMAT) {
      const dayIndex = fromFormat.indexOf(DAY_FORMAT);

      formattedDate.push(dateParts[dayIndex]);
    }

    if (item === MONTH_FORMAT) {
      const monthIndex = fromFormat.indexOf(MONTH_FORMAT);

      formattedDate.push(dateParts[monthIndex]);
    }
  });

  return formattedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
