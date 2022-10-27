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
  const inputDate = date.split(fromFormat[3]);
  const day = inputDate[fromFormat.indexOf('DD')];
  const month = inputDate[fromFormat.indexOf('MM')];
  const year = inputDate[fromFormat.indexOf('YYYY')]
  || inputDate[fromFormat.indexOf('YY')];

  const copyToFormat = [...toFormat];
  const dateBreakPoint = 30;
  const century = (year < dateBreakPoint)
    ? 20
    : 19;

  copyToFormat[copyToFormat.indexOf('DD')] = day;
  copyToFormat[copyToFormat.indexOf('MM')] = month;

  copyToFormat[copyToFormat.indexOf('YYYY')] = (year.length === 4)
    ? year
    : century + year;

  copyToFormat[copyToFormat.indexOf('YY')] = (year.length === 2)
    ? year
    : year.slice(2);

  const resultData = copyToFormat.slice(0, 3).join(copyToFormat[3]);

  return resultData;
}

module.exports = formatDate;
