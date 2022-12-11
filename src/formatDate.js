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
  const newFormat = [];
  const joiner = toFormat[3];
  const separator = fromFormat[3];
  const oldDate = date.split(separator);
  const dates = {
    YY: 0,
    YYYY: 0,
    MM: 0,
    DD: 0,
  };

  for (let i = 0; i <= fromFormat.length - 2; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        if (oldDate[i] < 30) {
          dates.YY = oldDate[i];
          dates.YYYY = 20 + `${oldDate[i]}`;
        } else {
          dates.YY = oldDate[i];
          dates.YYYY = 19 + `${oldDate[i]}`;
        }
        break;

      case 'YYYY':
        dates.YYYY = oldDate[i];
        dates.YY = oldDate[i].slice(-2);
        break;

      case 'MM':
        dates.MM = oldDate[i];
        break;

      case 'DD':
        dates.DD = oldDate[i];
        break;
    }
  }

  for (let i = 0; i <= toFormat.length - 2; i++) {
    switch (toFormat[i]) {
      case 'YY':
        newFormat[i] = dates.YY;
        break;

      case 'YYYY':
        newFormat[i] = dates.YYYY;
        break;

      case 'MM':
        newFormat[i] = dates.MM;
        break;

      case 'DD':
        newFormat[i] = dates.DD;
        break;
    }
  }

  return newFormat.join(joiner);
}

module.exports = formatDate;
