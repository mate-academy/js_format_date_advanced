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
  let array = [];
  const newSeparator = toFormat[3];
  const oldSeparator = fromFormat[3];
  const dateArrow = date.split(oldSeparator);

  if (fromFormat[0] === toFormat[0] && newSeparator !== oldSeparator) {
    return date.split(oldSeparator).join(newSeparator);
  }

  if (fromFormat[0] === toFormat[2]) {
    return date.split(oldSeparator).reverse().join(newSeparator);
  }

  if (fromFormat[1] === 'YYYY') {
    const shortDate = date.split(oldSeparator).slice(2);

    array = date.split(oldSeparator).slice(0, 2);

    const newDate = shortDate.concat(array);

    return newDate.join(newSeparator);
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateArrow[2] = dateArrow[2].slice(2);

    return dateArrow.join(newSeparator);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (+dateArrow[0] < 30) {
      dateArrow[0] = '20' + dateArrow[0];
    } else if (+dateArrow[0] >= 30) {
      dateArrow[0] = '19' + dateArrow[0];
    }

    return dateArrow.join(newSeparator);
  }
}

module.exports = formatDate;
