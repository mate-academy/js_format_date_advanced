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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const stringDate = date.split(fromSeparator);
  let newYearString;
  let newDate = [];
  let oldYear = 2;
  let newYear = 2;
  
  if (fromFormat.includes('YYYY')) {
    oldYear = 4;
  }

  if (toFormat.includes('YYYY')) {
    newYear = 4;
  }

  for (let i = 0; i < 3; i++) {
    if ((toFormat[i].includes('Y')) && (oldYear !== newYear)) {
      if (oldYear > newYear) { // YYYY -> YY
        let where = fromFormat.indexOf('YYYY');
        let oldYearString = stringDate[where];
        let newYearString = oldYearString[2] + oldYearString[3];
        newDate[i] = newYearString;
      } else { // YY -> YYYY
        let where = fromFormat.indexOf('YY');
        let oldYearString = stringDate[where];
  
        if (Number(oldYearString) < 30) {
          newYearString = '20' + oldYearString;  
        } else {
          newYearString = '19' + oldYearString;
        }
          newDate[i] = newYearString;
      }
    } else {
      let where = fromFormat.indexOf(toFormat[i]);
      newDate[i] = stringDate[where];
    }
  }

  return newDate.join(toSeparator);
}

module.exports = formatDate;
