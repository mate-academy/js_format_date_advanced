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
  let resultDate = [];

  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const dateComponents = date.split(fromSeparator);

  for (let i = 0; i < toFormat.length; i++) {
    const formatToken = toFormat[i];

    switch (formatToken) {
      case 'DD':
        resultDate.push(dateComponents[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        resultDate.push(dateComponents[fromFormat.indexOf('MM')]);
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          resultDate.push(dateComponents[fromFormat.indexOf('YYYY')]);
        } else if (fromFormat.includes('YY')) {
          const year2Digits = dateComponents[fromFormat.indexOf('YY')];

          if (year2Digits.length === 2) {
            if (year2Digits < '30') {
              resultDate.push(`20${year2Digits}`);
            } else {
              resultDate.push(`19${year2Digits}`);
            }
          } else {
            resultDate.push(year2Digits);
          }
        }
        break;

      case 'YY':
        if (fromFormat.includes('YYYY')) {
          resultDate.push(dateComponents[fromFormat.indexOf('YYYY')].slice(-2));
        } else if (fromFormat.includes('YY')) {
          resultDate.push(dateComponents[fromFormat.indexOf('YY')]);
        }
        break;
    }
  }
  resultDate = resultDate.join(toSeparator);

  return resultDate;
}

module.exports = formatDate;
