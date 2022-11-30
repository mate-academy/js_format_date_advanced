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
  const yearFormatFull = 'YYYY';
  const yearFormatShort = 'YY';
  const dayFormat = 'DD';
  const monthFormat = 'MM';

  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const splitDate = date.split(oldSeparator);

  const newDate = [];
  const temp = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case yearFormatFull:
        temp[splitDate[i]] = splitDate[i];
        break;

      case yearFormatShort:
        temp[yearFormatFull] = (splitDate[i] >= 30) ? `19${splitDate[i]}` : `20${splitDate[i]}`;
        break;
    }

    temp[fromFormat[i]] = splitDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case dayFormat:
        newDate.push(temp[dayFormat]);
        break;

      case monthFormat:
        newDate.push(temp[monthFormat]);
        break;

      case yearFormatFull:
        newDate.push(temp[yearFormatFull]);
        break;

      case yearFormatShort:
        newDate.push(temp[yearFormatFull].slice(-2));
        break;

      default:
        break;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
