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
  const fromSign = fromFormat.pop();
  const toSign = toFormat.pop();
  const fromFormatDate = fromFormat.slice(0, 3);
  const toFormatDate = toFormat.slice(0, 3);
  const fromArrayDate = date.split(fromSign);
  const newDate = [];

  if (fromFormatDate.includes('YY') && !toFormatDate.includes('YY')) {
    const indexYear = fromFormatDate.indexOf('YY');

    fromFormatDate.splice(indexYear, 1, 'YYYY');

    if (fromArrayDate[indexYear] < 30) {
      fromArrayDate.splice(indexYear, 1, `20${fromArrayDate[indexYear]}`);
    } else {
      fromArrayDate.splice(indexYear, 1, `19${fromArrayDate[indexYear]}`);
    }
  }

  if (fromFormatDate.includes('YYYY') && !toFormatDate.includes('YYYY')) {
    const indexYear = fromFormatDate.indexOf('YYYY');

    fromFormatDate.splice(indexYear, 1, 'YY');

    const arrYear = fromArrayDate[indexYear].split('');

    fromArrayDate[indexYear] = arrYear.slice(2).join('');
  }

  for (let i = 0; i < toFormatDate.length; i++) {
    const fromIndex = fromFormatDate.indexOf(toFormatDate[i]);

    newDate.push(fromArrayDate[fromIndex]);
  }

  return newDate.join(toSign);
}

module.exports = formatDate;
