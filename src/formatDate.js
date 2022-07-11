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
  let dateGather = '';
  const dateParts = date.split(fromFormat[3]);
  let DD = '';
  let MM = '';
  let YY = '';
  let YYYY = '';

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        DD = dateParts[i];
        break;

      case 'MM':
        MM = dateParts[i];
        break;

      case 'YY':
        YY = dateParts[i];
        break;

      case 'YYYY':
        YYYY = dateParts[i];
        break;

      default:
        break;
    }
  }

  if (YY.length > 0 && +YY < 30) {
    YYYY = '20' + YY;
  } else if (YY.length > 0 && +YY >= 30) {
    YYYY = '19' + YY;
  } else {
    YY = YYYY.slice(-2);
  }

  for (const e of toFormat) {
    switch (e) {
      case 'DD':
        dateGather += DD + toFormat[3];
        break;

      case 'MM':
        dateGather += MM + toFormat[3];
        break;

      case 'YY':
        dateGather += YY + toFormat[3];
        break;

      case 'YYYY':
        dateGather += YYYY + toFormat[3];
        break;

      default:
        break;
    }
  }

  return dateGather.slice(0, -1);
}

module.exports = formatDate;
