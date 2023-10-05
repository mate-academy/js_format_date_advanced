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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const oldDate = date.split(oldSeparator);
  const newDate = [];

  let oldY, oldM, oldD;
  let newY, newM, newD;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      oldY = i;
    } else if (fromFormat[i].includes('M')) {
      oldM = i;
    } else if (fromFormat[i].includes('D')) {
      oldD = i;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      newY = i;
    } else if (toFormat[i].includes('M')) {
      newM = i;
    } else if (toFormat[i].includes('D')) {
      newD = i;
    }
  }

  if (toFormat[newY].length === 2 && fromFormat[oldY].length === 4) {
    newDate[newY] = oldDate[oldY].slice(-2);
  } else if (toFormat[newY].length === 4 && fromFormat[oldY].length === 2) {
    if (Number(oldDate[oldY]) < 30) {
      newDate[newY] = '20' + oldDate[oldY];
    } else {
      newDate[newY] = '19' + oldDate[oldY];
    }
  } else {
    newDate[newY] = oldDate[oldY];
  }

  newDate[newM] = oldDate[oldM];
  newDate[newD] = oldDate[oldD];

  return newDate.join(newSeparator);
}

module.exports = formatDate;
