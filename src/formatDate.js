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
  const result = [];
  const splitedDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        for (let j = 0; j < toFormat.length; j++) {
          if (toFormat.indexOf('YYYY') !== -1) {
            result[toFormat.indexOf('YYYY')] = splitedDate[i];
          } else if (toFormat.indexOf('YY') !== -1) {
            result[toFormat.indexOf('YY')] = splitedDate[i].slice(2);
          }
        }
        break;
      case 'YY':
        for (let k = 0; k < toFormat.length; k++) {
          if (toFormat[i] === 'YY') {
            result[toFormat.indexOf('YY')] = splitedDate[i];
          } else if (toFormat.indexOf('YYYY') !== -1) {
            result[toFormat.indexOf('YYYY')]
              = splitedDate[i] < 30
                ? '20' + splitedDate[i]
                : '19' + splitedDate[i];
          }
        }
        break;
      case 'DD': result[toFormat.indexOf('DD')] = splitedDate[i];
        break;
      case 'MM': result[toFormat.indexOf('MM')] = splitedDate[i];
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
