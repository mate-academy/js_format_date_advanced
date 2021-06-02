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
  const fromSeparetor = fromFormat[3];
  const toSeparator = toFormat[3];
  const fromDate = date.split(fromSeparetor);
  const day = fromFormat.indexOf('DD');
  const month = fromFormat.indexOf('MM');
  const longYear = fromFormat.indexOf('YYYY');
  const shortYear = fromFormat.indexOf('YY');

  const formatedDate = [];

  for (let i = 0; i < fromDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formatedDate.push(fromDate[day]);
        break;

      case 'MM':
        formatedDate.push(fromDate[month]);
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          formatedDate.push(fromDate[longYear]);
        } else if (+fromDate[shortYear] > 20) {
          formatedDate.push('19' + fromDate[shortYear]);
        } else {
          formatedDate.push('20' + fromDate[shortYear]);
        }
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          formatedDate.push(fromDate[shortYear]);
        } else {
          formatedDate.push(fromDate[longYear].slice(2));
        }
        break;
    }
  }

  return formatedDate.join(toSeparator);
}

module.exports = formatDate;
