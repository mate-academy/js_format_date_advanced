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
  const finalArray = toFormat.slice(0, 3);
  const dateArray = date.split(fromFormat[3]);
  const object = {};

  for (let i = 0; i < dateArray.length; i++) {
    object[fromFormat[i]] = dateArray[i];
  }

  const newObject = {};

  for (let i = 0; i < dateArray.length; i++) {
    newObject[toFormat[i]] = object[toFormat[i]];

    if (toFormat[i] === 'YYYY' && !object.hasOwnProperty('YYYY')) {
      if (+object['YY'] >= 30) {
        newObject['YYYY'] = 19 + object['YY'];
      } else {
        newObject['YYYY'] = 20 + object['YY'];
      }
    }

    if (toFormat[i] === 'YY' && !object.hasOwnProperty('YY')) {
      if (object['YYYY'] >= 2000) {
        newObject['YY'] = +object['YYYY'] - 2000;
      } else {
        newObject['YY'] = +object['YYYY'] - 1900;
      }
    }
  }

  for (let i = 0; i < finalArray.length; i++) {
    finalArray[i] = newObject[finalArray[i]];
  }

  const string = finalArray.join(toFormat[3]);

  return string;
}

module.exports = formatDate;
