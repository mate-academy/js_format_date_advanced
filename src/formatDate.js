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
  const dateLength = fromFormat.length - 1;
  const fromDate = {};
  const toDate = [];
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  let yearStart = '20';

  date.split(fromSeparator).forEach((number, i) => {
    fromDate[fromFormat[i]] = number;
  });

  const year = fromDate.YYYY || fromDate.YY;

  if (year.slice(-2) >= 30) {
    yearStart = '19';
  }

  for (let i = 0; i < dateLength; i++) {
    if (!fromDate[toFormat[i]]) {
      fromDate[toFormat[i]] = formatYear(toFormat[i], fromDate, yearStart);
    }

    toDate.push(fromDate[toFormat[i]]);
  }

  return toDate.join(toSeparator);
}

function formatYear(year, date, yearStart) {
  if (year.length === 4) {
    return yearStart + date[year.slice(2)];
  }

  return date[year + 'YY'].substr(2);
}

module.exports = formatDate;
