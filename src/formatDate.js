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
  const startSeparator = fromFormat[3];
  const endSeparator = toFormat[3];
  const arrDate = date.split(startSeparator);

  let YY = 0;
  let YYYY = 0;
  let MM = 0;
  let DD = 0;

  const result = [];

  for (let x = 0; x < fromFormat.length; x++) {
    switch (fromFormat[x]) {
      case 'YY':
        YY = arrDate[x];
        break;

      case 'YYYY':
        YYYY = arrDate[x];
        break;

      case 'DD':
        DD = arrDate[x];
        break;

      case 'MM':
        MM = arrDate[x];
        break;

      default:
        break;
    }
  }

  if (YY === 0) {
    YY = YYYY.slice(2);
  }

  if (YYYY === 0) {
    if (+YY < 30) {
      YYYY = `20${YY}`;
    } else {
      YYYY = `19${YY}`;
    }
  }

  for (let x = 0; x < toFormat.length; x++) {
    switch (toFormat[x]) {
      case 'YYYY':
        result.push(YYYY);
        break;

      case 'YY':
        result.push(YY);
        break;

      case 'DD':
        result.push(DD);
        break;

      case 'MM':
        result.push(MM);
        break;

      default:
        break;
    }
  }

  return result.join(endSeparator);
}

module.exports = formatDate;
