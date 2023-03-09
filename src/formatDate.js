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
  const separator = fromFormat.slice(-1);
  const newSeparator = toFormat.slice(-1);
  const copyDate = date.split(separator);
  const copyFromFormat = fromFormat.slice(0, 3);
  const copyToFormat = toFormat.slice(0, 3);

  const newFormatDate = [];

  for (let i = 0; i < copyToFormat.length; i++) {
    for (let k = 0; k < copyFromFormat.length; k++) {
      if (copyToFormat[i] === copyFromFormat[k]) {
        newFormatDate.push(copyDate[k]);
      }

      if (copyToFormat[i] === 'YY' && copyFromFormat[k] === 'YYYY') {
        newFormatDate.push(copyDate[k].slice(2));
      }

      if (copyToFormat[i] === 'YYYY' && copyFromFormat[k] === 'YY') {
        if (+copyDate[k] < 30) {
          newFormatDate.push('20' + copyDate[k]);
        }

        if (+copyDate[k] >= 30) {
          newFormatDate.push('19' + copyDate[k]);
        }
      }
    }
  }

  return newFormatDate.join(newSeparator);
}

module.exports = formatDate;
