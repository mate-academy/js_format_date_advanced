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
  const copyFromFormat = [...fromFormat];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldData = date.split(oldSeparator);
  const newData = [];

  for (let i = 0; i < oldData.length; i++) {
    const fromIndex = copyFromFormat.indexOf(copyFromFormat[i]);

    if (copyFromFormat[i] === 'YYYY' && toFormat[fromIndex] === 'YY') {
      oldData[i] = oldData[i].slice(2);

      copyFromFormat[i] = 'YY';
    }

    if (copyFromFormat[i] === 'YY' && toFormat[fromIndex] === 'YYYY') {
      oldData[i] = +oldData[i] < 30 ? '20' + oldData[i] : '19' + oldData[i];

      copyFromFormat[i] = 'YYYY';
    }

    const toIndex = toFormat.indexOf(copyFromFormat[i]);

    newData[toIndex] = oldData[i];
  }

  return newData.join(newSeparator);
}

module.exports = formatDate;
