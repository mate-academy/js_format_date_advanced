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
  const dateArr = date.split(fromFormat[3]);

  const newDate = [];

  // determining the day, month and year -------------

  let oldFormatDay;
  let oldFormatMonth;
  let oldFormatYear;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD' :
        oldFormatDay = dateArr[i];
        break;

      case 'MM' :
        oldFormatMonth = dateArr[i];
        break;

      default :
        oldFormatYear = dateArr[i];
    }
  }

  // collecting and return the newData -------------

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD' :
        newDate[i] = oldFormatDay;
        break;

      case 'MM' :
        newDate[i] = oldFormatMonth;
        break;

      default :

        if (toFormat[i].length > oldFormatYear.length) {
          if (+oldFormatYear < 30) {
            oldFormatYear = '20' + oldFormatYear;
          } else {
            oldFormatYear = '19' + oldFormatYear;
          }
        }

        if (toFormat[i].length < oldFormatYear.length) {
          oldFormatYear = oldFormatYear.slice(2);
        }

        newDate[i] = oldFormatYear;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
