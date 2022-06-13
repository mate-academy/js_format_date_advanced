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
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const dateSplit = date.split(fromSeparator);

  const fromDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    const key = fromFormat[i];

    fromDate[key] = dateSplit[i];
  }

  const result = [];

  for (let i = 0; i < toFormat.length; i++) {
    const format = toFormat[i];
    const keys = Object.keys(fromDate);

    if (format === 'YY' && keys.includes('YYYY')) {
      const y = fromDate['YYYY'].slice(-2);

      result.push(y);
    } else if (format === 'YYYY' && keys.includes('YY')) {
      const y
        = fromDate['YY'] < 30 ? `20${fromDate['YY']}` : `19${fromDate['YY']}`;

      result.push(y);
    } else {
      result.push(fromDate[format]);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
