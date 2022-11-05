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
  const sumIndexDate = 3; // 0 + 1 + 2

  const indexDateFrom = fromFormat.indexOf('DD');
  const indexMonthFrom = fromFormat.indexOf('MM');
  const indexYearFrom = sumIndexDate - indexDateFrom - indexMonthFrom;

  const indexDateTo = toFormat.indexOf('DD');
  const indexMonthTo = toFormat.indexOf('MM');
  const indexYearTo = sumIndexDate - indexDateTo - indexMonthTo;

  const splitDate = date.split(fromFormat[3]);
  const DD = splitDate[indexDateFrom];
  const MM = splitDate[indexMonthFrom];
  let YY = splitDate[indexYearFrom];

  if (fromFormat[indexYearFrom].length
    > toFormat[indexYearTo].length) {
    YY = YY.slice(-2);
  } else if (fromFormat[indexYearFrom].length
    < toFormat[indexYearTo].length) {
    if (YY < 30) {
      YY = 2000 + +YY;
    } else {
      YY = 1900 + +YY;
    }
  }

  const arraynewData = [];

  arraynewData[indexDateTo] = DD;
  arraynewData[indexMonthTo] = MM;
  arraynewData[indexYearTo] = YY;

  return arraynewData.join(toFormat[3]);
}

module.exports = formatDate;
