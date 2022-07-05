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
  const dateSplit = date.split(fromFormat[3]);
  const indexOfDD = fromFormat.indexOf('DD');
  const indexOfMM = fromFormat.indexOf('MM');
  const indexOfYY = fromFormat.indexOf('YY');
  const indexOfYYYY = fromFormat.indexOf('YYYY');
  const DD = dateSplit[indexOfDD];
  const MM = dateSplit[indexOfMM];
  const YY = +dateSplit[indexOfYY] || dateSplit[indexOfYYYY] % 100;
  let YYYY = +dateSplit[indexOfYYYY] || +dateSplit[indexOfYY];
  const toDate = [];

  if (YYYY >= 30 && YYYY < 99) {
    YYYY += 1900;
  } else if (YYYY < 30) {
    YYYY += 2000;
  }

  for (let item = 0; item < 3; item++) {
    switch (toFormat[item]) {
      case 'DD':
        toDate.push(DD);
        break;

      case 'MM':
        toDate.push(MM);
        break;

      case 'YY':
        toDate.push(YY);
        break;

      default:
        toDate.push(YYYY);
        break;
    }
  }

  return toDate.join(toFormat[3]);
}

module.exports = formatDate;
