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
  const dates = date.split(fromFormat[fromFormat.length - 1]);
  const filledInputFormat = {};
  const outputFormat = [...toFormat];

  outputFormat.length--;

  for (let i = 0; i < dates.length; i++) {
    filledInputFormat[fromFormat[i]] = dates[i];
  }

  for (let i = 0; i < outputFormat.length; i++) {
    switch (outputFormat[i]) {
      case 'DD':
        outputFormat[i] = filledInputFormat['DD'];
        break;

      case 'MM':
        outputFormat[i] = filledInputFormat['MM'];
        break;

      case 'YY':
        outputFormat[i] = filledInputFormat['YY'];

        if (filledInputFormat['YY'] === undefined) {
          outputFormat[i] = `${filledInputFormat['YYYY']}`.slice(2);
        }
        break;

      case 'YYYY':
        outputFormat[i] = filledInputFormat['YYYY'];

        if (filledInputFormat['YYYY'] === undefined) {
          if (filledInputFormat['YY'] >= 30) {
            outputFormat[i] = `19${filledInputFormat['YY']}`;
            break;
          }

          outputFormat[i] = `20${filledInputFormat['YY']}`;
        }
        break;

      default:
        throw new Error(`Wrong output format: ${outputFormat[i]}`);
    }
  }

  return outputFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
