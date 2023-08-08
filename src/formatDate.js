'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 \/* date format. Create a `formatDate` function that accepts the `date` string,
 \/* the old `fromFormat` array and the new `toFormat` array. Function returns
 \/* given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 \/*   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
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
  const newFormatDate = [];
  let newDay = '';
  let newMonth = '';
  let newYear = '';
  const newSeparator = toFormat[3];
  let oldYear;
  const oldDateSplit = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      newDay = oldDateSplit[i];
    }

    if (fromFormat[i] === 'MM') {
      newMonth = oldDateSplit[i];
    }

    if (fromFormat[i].slice(0, 2) === 'YY') {
      oldYear = oldDateSplit[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newFormatDate[i] = newDay;
    }

    if (toFormat[i] === 'MM') {
      // newFormatDate += (newMonth + newSeparator);
      newFormatDate[i] = newMonth;
    }

    if (toFormat[i].slice(0, 2) === 'YY') {
      if (toFormat[i].length === oldYear.length) {
        newYear = oldYear;
      }

      if (toFormat[i].length < oldYear.length) {
        newYear = oldYear.slice(2, 4);
      }

      if (toFormat[i].length > oldYear.length) {
        if (+oldYear < 30) {
          newYear = '20' + oldYear;
        } else {
          newYear = '19' + oldYear;
        }
      }

      newFormatDate[i] = newYear;
    }
  }

  return newFormatDate.join(newSeparator);
}

module.exports = formatDate;
