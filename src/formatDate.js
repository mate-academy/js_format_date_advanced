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
  // const newFormat = '';
  const result = [];
  const newDate = date.split(fromFormat[3]);

  // new arrays without separators
  const fromFormatWithoutSeparator = fromFormat.slice(0, 3);
  const toFormatWithoutSeparator = toFormat.slice(0, 3);

  // if arrays are equal, than return the same format, only with a new separator
  if (JSON.stringify(fromFormatWithoutSeparator)
  === JSON.stringify(toFormatWithoutSeparator)) {
    return date.split(fromFormat[3]).join(toFormat[3]);
  }

  // if YYYY is reduced to YY
  if (fromFormat[2][0]
  === toFormat[2][0]
  && fromFormat[2].length
  !== toFormat[2].length) {
    const year = newDate[2].slice(2);

    newDate[2] = year;

    return newDate.join(toFormat[3]);
  }

  // a non-standard format, if YYYY is in the middle
  if (fromFormat[1] === 'YYYY') {
    result[0] = newDate[2];
    result[1] = newDate[0];
    result[2] = newDate[1];

    return result.join(toFormat[3]);
  }

  // add 20 or 19 to the year
  if (fromFormat[0][0]
    === toFormat[0][0]
    && fromFormat[0].length
    !== toFormat[0].length) {
    if (+newDate[0] >= 30) {
      newDate[0] = '19' + newDate[0];

      return newDate.join(toFormat[3]);
    }

    if (+newDate[0].slice(2) < 30) {
      newDate[0] = '20' + newDate[0];

      return newDate.join(toFormat[3]);
    }
  }

  return newDate.reverse().join(toFormat[3]);
}

module.exports = formatDate;
