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
  const resultDate = [];

  const fromSeparator = fromFormat[fromFormat.length - 1];
  const dateComponents = date.split(fromSeparator);
  const toSeparator = toFormat[toFormat.length - 1];

  for (let i = 0; i < toFormat.length; i++) {
    const formatToken = toFormat[i];

    switch (formatToken) {
      case 'YYYY':
        if (dateComponents[0].length === 4) {
          resultDate.push(dateComponents[0]);
        } else {
          resultDate.push(`20${dateComponents[0]}`);
        }
        break;

      case 'YY':
        if (dateComponents[0].length === 4) {
          resultDate.push(dateComponents[0].slice(2));
        } else {
          resultDate.push(dateComponents[0]);
        }
        break;
      case 'MM':
        resultDate.push(dateComponents[1]);
        break;
      case 'DD':
        resultDate.push(dateComponents[2]);
        break;
      default:
        resultDate.push(formatToken);
    }
  }

  return resultDate.join(toSeparator);
}

module.exports = formatDate;
