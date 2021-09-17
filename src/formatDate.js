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
  const inputFormat = fromFormat.slice(0, 3);
  const outputFormat = toFormat.slice(0, 3);
  const inputSeparator = fromFormat[3];
  const outputSeparator = toFormat[3];
  const inputData = date.split(inputSeparator);
  const result = [];

  for (const i in outputFormat) {
    switch (outputFormat[i]) {
      case 'MM':
        for (const j in inputFormat) {
          if (inputFormat[j] === 'MM') {
            result[i] = inputData[j];
          }
        }
        break;

      case 'DD':
        for (const j in inputFormat) {
          if (inputFormat[j] === 'DD') {
            result[i] = inputData[j];
          }
        }
        break;

      case 'YY':
        for (const j in inputFormat) {
          if (inputFormat[j] === 'YY' || inputFormat[j] === 'YYYY') {
            if (inputFormat[j] === 'YY') {
              result[i] = inputData[j];
            } else {
              result[i] = inputData[j][2] + inputData[j][3];
            }
          }
        }
        break;

      case 'YYYY':
        for (const j in inputFormat) {
          if (inputFormat[j] === 'YY' || inputFormat[j] === 'YYYY') {
            if (inputFormat[j] === 'YYYY') {
              result[i] = inputData[j];
            } else {
              if (+inputData[j] > 25) {
                result[i] = '19' + inputData[j];
              } else {
                result[i] = '20' + inputData[j];
              }
            }
          }
        }
    }
  }

  return result.join(outputSeparator);
}

module.exports = formatDate;
