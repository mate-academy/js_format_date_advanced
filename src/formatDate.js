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
  const fromDayArray = date.split(fromFormat[3]);

  const newObject = {};

  newObject[`${fromFormat[0]}`] = fromDayArray[0];
  newObject[`${fromFormat[1]}`] = fromDayArray[1];
  newObject[`${fromFormat[2]}`] = fromDayArray[2];

  const toDayArray = [];

  for (let i = 0; i < 3; i++) {
    for (const key in newObject) {
      if (toFormat[i] === key) {
        toDayArray[i] = newObject[key];
      }

      switch (key) {
        case 'YY':
          switch (toFormat[i]) {
            case 'YY':
              toDayArray[i] = newObject[key];
              break;
            case 'YYYY':
              if (Number(newObject[key]) >= 30) {
                toDayArray[i] = '19' + newObject[key];
              } else {
                toDayArray[i] = '20' + newObject[key];
              }
              break;
          }
          break;
        case 'YYYY':
          switch (toFormat[i]) {
            case 'YYYY':
              toDayArray[i] = newObject[key];
              break;
            case 'YY':
              toDayArray[i] = newObject[key][2] + newObject[key][3];
              break;
          }
          break;
      }
    }
  }

  const resultString = toDayArray.join(toFormat[3]);

  return resultString;
}

module.exports = formatDate;
