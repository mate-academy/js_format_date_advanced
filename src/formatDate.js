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
  // write code here
  const year = fromFormat.indexOf('YYYY');
  const shortYear = fromFormat.indexOf('YY');
  const month = fromFormat.indexOf('MM');
  const day = fromFormat.indexOf('DD');
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateSplited = date.split(oldSeparator);
  const dateResult = [];

  for (const key of toFormat) {
    if (key === 'DD') {
      dateResult.push(dateSplited[day]);
    }

    if (key === 'MM') {
      dateResult.push(dateSplited[month]);
    }

    if (key === 'YY') {
      if (dateSplited[shortYear]) {
        dateResult.push(dateSplited[shortYear]);
      } else {
        dateResult.push(dateSplited[year].slice(2));
      }
    }

    if (key === 'YYYY') {
      if (dateSplited[year]) {
        dateResult.push(dateSplited[year]);
      } else {
        if (+dateSplited[shortYear] < 30) {
          dateResult.push(`20${dateSplited[shortYear]}`);
        } else {
          dateResult.push(`19${dateSplited[shortYear]}`);
        }
      }
    }
  }

  return dateResult.join(newSeparator);
}

module.exports = formatDate;
