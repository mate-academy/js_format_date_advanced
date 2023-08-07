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
 *formatDate.js
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let newFormatDate = '';
  let newDay = '';
  let newMonth = '';
  let newYear = '';
  const newSeparator = toFormat[3];

  let oldDateSplit = [];
  let oldYear = '';

  oldDateSplit = date.split(fromFormat[3]);

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

  for (const elem of toFormat) {
    if (elem === 'DD') {
      newFormatDate += (newDay + newSeparator);
    }

    if (elem === 'MM') {
      newFormatDate += (newMonth + newSeparator);
    }

    if (elem.slice(0, 2) === 'YY') {
      if (elem.length === oldYear.length) {
        newYear = oldYear;
      }

      if (elem.length < oldYear.length) {
        newYear = oldYear.slice(2, 4);
      }

      if (elem.length > oldYear.length) {
        if (oldYear < '30') {
          newYear = '20' + oldYear;
        } else {
          newYear = '19' + oldYear;
        }
      }

      newFormatDate += (newYear + newSeparator);
    }
  }

  return newFormatDate.slice(0, (newFormatDate.length - 1));
}

module.exports = formatDate;
