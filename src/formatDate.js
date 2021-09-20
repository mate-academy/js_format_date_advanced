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

  for (const formatPosition of outputFormat) {
    switch (formatPosition) {
      case 'MM':
        for (const position in inputFormat) {
          if (inputFormat[position] === 'MM') {
            result.push(inputData[position]);
          }
        }
        break;

      case 'DD':
        for (const position in inputFormat) {
          if (inputFormat[position] === 'DD') {
            result.push(inputData[position]);
          }
        }
        break;

      case 'YY':
        for (const position in inputFormat) {
          if (inputFormat[position] === 'YY'
            || inputFormat[position] === 'YYYY') {
            if (inputFormat[position] === 'YY') {
              result.push(inputData[position]);
            } else {
              result.push(inputData[position][2] + inputData[position][3]);
            }
          }
        }
        break;

      case 'YYYY':
        for (const position in inputFormat) {
          if (inputFormat[position] === 'YY'
            || inputFormat[position] === 'YYYY') {
            if (inputFormat[position] === 'YYYY') {
              result.push(inputData[position]);
            } else {
              if (+inputData[position] >= 30) {
                result.push('19' + inputData[position]);
              } else {
                result.push('20' + inputData[position]);
              }
            }
          }
        }
        break;

      default:
        break;
    }
  }

  return result.join(outputSeparator);
}

module.exports = formatDate;
