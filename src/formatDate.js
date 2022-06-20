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
  const arrDate = date.split(fromFormat[3]);

  const basicFormat = [...fromFormat];
  const finalFormat = [...toFormat];

  if (basicFormat.includes('YYYY') && toFormat.includes('YY')) {
    const position = basicFormat.indexOf('YYYY');

    arrDate[position] = arrDate[position].slice(2);
    basicFormat[position] = 'YY';
  }

  if (basicFormat.includes('YY') && toFormat.includes('YYYY')) {
    const position = basicFormat.indexOf('YY');

    if (arrDate[position] < 30) {
      arrDate[position] = '20' + arrDate[position];
    } else {
      arrDate[position] = '19' + arrDate[position];
    }
    basicFormat[position] = 'YYYY';
  }

  for (let i = 0; i < basicFormat.length - 1; i++) {
    const position = toFormat.indexOf(basicFormat[i]);

    finalFormat[position] = arrDate[i];
  }

  const separator = finalFormat[3];

  finalFormat.length = 3;

  const finalDate = finalFormat.join(separator);

  return finalDate;
}

module.exports = formatDate;
