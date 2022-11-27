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
  const array = date.split(fromFormat[3]);
  const oldFormat = fromFormat.slice(0, 3);
  const newFormat = toFormat.slice(0, 3);
  const separator = toFormat[3];
  let result = '';

  for (let i = 0; i < oldFormat.length; i++) {
    if (oldFormat[i] !== newFormat[i]) {
      const index = returnIndex(oldFormat, newFormat, i);

      result += returnString(i, index, oldFormat, newFormat, array);
    } else {
      result += array[i] + ' ';
    }
  }

  return result.trim().split(' ').join(separator);
}

const returnString = (i, index, oldFormat, newFormat, array) => {
  switch (true) {
    case newFormat[i] === 'YYYY' && oldFormat[i] === 'YY':
      return array[index] < 30 ? `20${array[index]}` + ' ' : `19${array[index]}` + ' ';
    case newFormat[i] === 'YY' && oldFormat[i] === 'YYYY':
      return array[index].slice(2) + ' ';
    default:
      return array[index] + ' ';
  }
};

const returnIndex = (oldFormat, newFormat, index) => {
  switch (true) {
    case oldFormat.indexOf(newFormat[index]) !== -1:
      return oldFormat.indexOf(newFormat[index]);
    default:
      return oldFormat.indexOf('YYYY') === -1
        ? oldFormat.indexOf('YY')
        : oldFormat.indexOf('YYYY');
  }
};

module.exports = formatDate;
