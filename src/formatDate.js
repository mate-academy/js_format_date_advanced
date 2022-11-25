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
  return toDate(toFormat, separateDate(fromFormat, date));
}

module.exports = formatDate;

function separateDate(format, date) {
  const dateArr = date.split(format[3]);

  const dateObj = {};

  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'YYYY') {
      dateObj.year = dateArr[i];
    }

    if (format[i] === 'YY') {
      dateObj.year = dateArr[i];
    }

    if (format[i] === 'DD') {
      dateObj.day = dateArr[i];
    }

    if (format[i] === 'MM') {
      dateObj.month = dateArr[i];
    }
  }

  return dateObj;
}

function toDate(format, dateObj) {
  const dateArr = [];

  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'YYYY') {
      if (dateObj.year.length === 2 && dateObj.year < 30) {
        dateArr.push(`20${dateObj.year}`);
      } else if (dateObj.year.length === 2 && dateObj.year >= 30) {
        dateArr.push(`19${dateObj.year}`);
      } else {
        dateArr.push(dateObj.year);
      }
    }

    if (format[i] === 'YY') {
      if (dateObj.year.length === 4) {
        dateArr.push(dateObj.year.slice(2));
      } else {
        dateArr.push(dateObj.year);
      }
    }

    if (format[i] === 'DD') {
      dateArr.push(dateObj.day);
    }

    if (format[i] === 'MM') {
      dateArr.push(dateObj.month);
    }
  }

  return dateArr.join(format[3]);
}
