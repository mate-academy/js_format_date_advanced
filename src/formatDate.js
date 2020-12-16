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
  const splitter = fromFormat[3];
  const dateArray = date.split(splitter);

  let needToReverse = 0;
  let fromLength = 0;
  let toLength = 0;

  for (let i = 0; i < 4; i++) {
    if (fromFormat[i].includes('Y') && toFormat[i].indexOf('Y') === -1) {
      needToReverse = 1;
    }

    if (fromFormat[i].includes('Y')) {
      fromLength = fromFormat[i].length;
    }

    if (toFormat[i].includes('Y')) {
      toLength = toFormat[i].length;
    }
  }

  let needToExpand = false;
  let needToCut = false;

  if (fromLength > toLength) {
    needToCut = true;
  }

  if (fromLength < toLength) {
    needToExpand = true;
  }

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) >= 30
      && needToExpand) {
      dateArray[i] = `19${dateArray[i]}`;
    }

    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) < 30
      && needToExpand) {
      dateArray[i] = `20${dateArray[i]}`;
    }

    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) >= 30
      && needToCut) {
      dateArray[i] = dateArray[i].slice(-2);
    }

    if (fromFormat[i].includes('Y')
      && dateArray[i].slice(-2) < 30
      && needToCut) {
      dateArray[i] = dateArray[i].slice(-2);
    }
  }

  const separator = toFormat[3];

  if (needToReverse === 1) {
    return dateArray.reverse().join(separator);
  }

  if (needToReverse === 0) {
    return dateArray.join(separator);
  }
}

module.exports = formatDate;
