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
  const formatedDate = [];
  const splitDate = date.split(fromFormat[3]);

  const year = splitDate[fromFormat.indexOf('YY')]
    || splitDate[fromFormat.indexOf('YYYY')];
  const month = splitDate[fromFormat.indexOf('MM')];
  const day = splitDate[fromFormat.indexOf('DD')];

  for (const period of toFormat) {
    if (period === 'DD') {
      formatedDate.push(day);
    }

    if (period === 'MM') {
      formatedDate.push(month);
    }

    if (period === 'YY' && year.length === 2) {
      formatedDate.push(year);
    }

    if (period === 'YY' && year.length === 4) {
      formatedDate.push(year.slice(2));
    }

    if (period === 'YYYY' && year.length === 4) {
      formatedDate.push(year);
    }

    if (period === 'YYYY' && year.length === 2) {
      formatedDate.push((year < 30 ? '20' : '19') + year);
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
