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
  const dateSet = {};
  const fromDatelist = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      dateSet.year = String(fromDatelist[i]);
    } else if (fromFormat[i] === 'MM') {
      dateSet.month = String(fromDatelist[i]);
    } else if (fromFormat[i] === 'DD') {
      dateSet.day = String(fromDatelist[i]);
    }
  }

  let upDate = '';

  for (let j = 0; j < toFormat.length; j++) {
    if (toFormat[j] === 'YY' || toFormat[j] === 'YYYY') {
      if (toFormat[j].length === dateSet.year.length) {
        upDate += dateSet.year;
      } else if (toFormat[j].length > dateSet.year.length) {
        if (+dateSet.year < 30 && +dateSet.year > 0) {
          upDate = upDate + '20' + dateSet.year;
        } else if (+dateSet.year >= 30) {
          upDate = upDate + '19' + dateSet.year;
        } else if (dateSet.year === '00') {
          upDate = upDate + '20' + dateSet.year;
        }
      } else if (toFormat[j].length < dateSet.year.length) {
        upDate = upDate + dateSet.year.slice(2);
      }
    } else if (toFormat[j] === 'MM') {
      upDate += dateSet.month;
    } else if (toFormat[j] === 'DD') {
      upDate += dateSet.day;
    }

    if (j < toFormat.length - 2) {
      upDate += toFormat[3];
    }
  }

  return upDate;
}

module.exports = formatDate;
