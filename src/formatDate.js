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
  const objDate = {
    DD: null,
    MM: null,
    YYYY: null,
    YY: null,
  };

  const arrFrom = date.split(`${fromFormat[3]}`);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case ('DD'):
        objDate.DD = arrFrom[i];
        break;
      case ('MM'):
        objDate.MM = arrFrom[i];
        break;
      case ('YY'):
        objDate.YY = arrFrom[i];
        break;
      case ('YYYY'):
        objDate.YYYY = arrFrom[i];
        break;
      default:
        break;
    }
  }

  if (objDate.YY === null) {
    objDate.YY = objDate.YYYY.split('').slice(2).join('');
  } else if (objDate.YYYY === null) {
    if (objDate.YY < 30) {
      objDate.YYYY = +(`` + 20 + objDate.YY);
    } else {
      objDate.YYYY = +(`` + 19 + objDate.YY);
    }
  }

  const arrTo = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case ('DD'):
        arrTo.push(objDate.DD);
        break;
      case ('MM'):
        arrTo.push(objDate.MM);
        break;
      case ('YY'):
        arrTo.push(objDate.YY);
        break;
      case ('YYYY'):
        arrTo.push(objDate.YYYY);
        break;
      default:
        break;
    }
  }

  return arrTo.join(`${toFormat[3]}`);
}

module.exports = formatDate;
