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
  const startFormat = [...fromFormat];
  const startSeparator = startFormat.pop();
  const startDate = date.split(startSeparator);

  const resultFormat = [...toFormat];
  const resultSeparator = resultFormat.pop();

  let yearIndex;

  if (startFormat.includes('YY')) {
    yearIndex = startFormat.indexOf('YY');

    if (resultFormat.includes('YYYY')) {
      if (startDate[yearIndex] < 30) {
        startDate[yearIndex] = `20${startDate[yearIndex]}`;
      } else {
        startDate[yearIndex] = `19${startDate[yearIndex]}`;
      }

      startFormat[yearIndex] = 'YYYY';
    }
  }

  if (startFormat.includes('YYYY')) {
    yearIndex = startFormat.indexOf('YYYY');

    if (resultFormat.includes('YY')) {
      startDate[yearIndex] = startDate[yearIndex].slice(-2);

      startFormat[yearIndex] = 'YY';
    }
  }

  const resultDate = [];

  for (let i = 0; i < resultFormat.length; i++) {
    const index = startFormat.indexOf(resultFormat[i]);

    resultDate.push(startDate[index]);
  }

  return resultDate.join(resultSeparator);
}

module.exports = formatDate;
