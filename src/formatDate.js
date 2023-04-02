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
  const [ a, b, c, separator ] = fromFormat;
  const newSeparator = toFormat[3];

  const newData = [];

  const arr = date.split(separator);

  const obj = {};

  obj[a] = arr[0];
  obj[b] = arr[1];
  obj[c] = arr[2];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    obj.YYYY = obj.YYYY.substring(2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    obj.YYYY = obj.YY < 30 ? `20${obj.YY}` : `19${obj.YY}`;
  }

  toFormat.length -= 1;

  for (const toFor of toFormat) {
    switch (toFor) {
      case 'YYYY':
      case 'YY': newData.push(obj.YYYY);
        break;
      case 'MM': newData.push(obj.MM);
        break;
      case 'DD': newData.push(obj.DD);
        break;
      default:
        newData.push('N/A');
        break;
    }
  }

  return newData.join(newSeparator);
}

formatDate(
  '18-02-2020',
  ['DD', 'MM', 'YYYY', '-'],
  ['DD', 'MM', 'YY', '/'],
); // '18/02/20'

module.exports = formatDate;
