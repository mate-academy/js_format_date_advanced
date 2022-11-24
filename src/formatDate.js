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
  const dictionary = {};
  const dateValues = date.split(fromFormat[3]);

  // destructuring fromFormat into a dictionary
  // for reading the parameter date
  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      dictionary['DD'] = dateValues[i];
    } else if (fromFormat[i] === 'MM') {
      dictionary['MM'] = dateValues[i];
    } else if (fromFormat[i] === 'YY') {
      dictionary['YY'] = dateValues[i];
    } else if (fromFormat[i] === 'YYYY') {
      dictionary['YYYY'] = dateValues[i];
    }
  }

  let result = '';

  // applying dictionary with toFormat
  // to create the result (resulting date)
  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      result += dictionary['DD'];
    } else if (toFormat[i] === 'MM') {
      result += dictionary['MM'];
    } else if (toFormat[i] === 'YY') {
      if ('YY' in dictionary) {
        result += dictionary['YY'];
      } else {
        result += dictionary['YYYY'].substring(2);
      }
    } else if (toFormat[i] === 'YYYY') {
      if ('YYYY' in dictionary) {
        result += dictionary['YYYY'];
      } else {
        if (dictionary['YY'][0] < '3') {
          result += '20' + dictionary['YY'];
        } else {
          result += '19' + dictionary['YY'];
        }
      }
    }

    if (i !== 2) {
      result += toFormat[3];
    }
  }

  return result;
}

module.exports = formatDate;
