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
  const dateArray = date.split(fromFormat[3]);
  const dateObject = {};
  const length = dateArray.length;

  for (let i = 0; i < length; i++) {
    switch (fromFormat[i][0]) {
      case 'D':
        Object.assign(dateObject, { day: dateArray[i] });
        break;

      case 'M':
        Object.assign(dateObject, { month: dateArray[i] });
        break;

      case 'Y':
        let yearFull = '';

        if (fromFormat[i].length === 2 && +dateArray[i] < 30) {
          yearFull += '20';
          yearFull += dateArray[i];
        } else if ((fromFormat[i].length === 2 && +dateArray[i] >= 30)) {
          yearFull += '19';
          yearFull += dateArray[i];
        } else {
          yearFull += dateArray[i];
        }
        Object.assign(dateObject, { year: yearFull });
        break;

      default:
        break;
    }
  }

  const resultDateArray = [];

  resultDateArray.length = length;

  for (let i = 0; i < length; i++) {
    switch (toFormat[i][0]) {
      case 'D':
        resultDateArray[i] = dateObject.day;
        break;

      case 'M':
        resultDateArray[i] = dateObject.month;
        break;

      case 'Y':
        let yearFull = dateObject.year;

        if (toFormat[i].length === 2) {
          yearFull = dateObject.year.substring(2, 4);
        }
        resultDateArray[i] = yearFull;
        break;

      default:
        break;
    }
  }

  return resultDateArray.join(toFormat[3]);
}

module.exports = formatDate;
