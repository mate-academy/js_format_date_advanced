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
  const obgectFrom = Object.assign({}, fromFormat);
  const { 3: separFrom } = obgectFrom;
  const obgectTo = Object.assign({}, toFormat);
  const { 3: separTo } = obgectTo;
  const arrayDataFrom = date.split(separFrom);
  const arrayResult = [];

  for (const keyFrom in obgectFrom) {
    for (const keyTo in obgectTo) {
      if (obgectFrom[keyFrom] === obgectTo[keyTo]) {
        arrayResult[keyTo] = arrayDataFrom[keyFrom];
      }

      if (obgectFrom[keyFrom].includes('Y') && obgectTo[keyTo].includes('Y')) {
        if (obgectFrom[keyFrom].length > obgectTo[keyTo].length) {
          arrayResult[keyTo] = arrayDataFrom[keyFrom].slice(-2);
        }

        if (obgectFrom[keyFrom].length < obgectTo[keyTo].length) {
          if (arrayDataFrom[keyFrom] < 30) {
            arrayResult[keyTo] = `20${arrayDataFrom[keyFrom]}`;
          } else {
            arrayResult[keyTo] = `19${arrayDataFrom[keyFrom]}`;
          }
        }
      }
    }
  }

  arrayResult.length = 3;

  return arrayResult.join(separTo);
}

module.exports = formatDate;
