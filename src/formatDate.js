/* eslint-disable quotes */
"use strict";

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
  const res = [];
  const currentYear = new Date().getFullYear() % 100;
  const dateArr = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const dateObg = {
    year: null,
    month: null,
    day: null,
    separator: null,
  };

  fromFormat.forEach((item, index) => {
    switch (true) {
      case item === "YYYY":
        dateObg.year = dateArr[index];
        break;
      case item === "YY":
        dateObg.year = dateArr[index].slice(-2);
        break;
      case item === "MM":
        dateObg.month = dateArr[index];
        break;
      case item === "DD":
        dateObg.day = dateArr[index];
        break;
      default:
        dateObg.separator = toFormat[toFormat.length - 1];
    }
  });

  toFormat.forEach((item, index) => {
    switch (true) {
      case item === "YYYY"
        && dateObg.year.length === 2
        && +dateObg.year < currentYear:
        res[index] = `20${dateObg.year}`;
        break;
      case item === "YYYY"
        && dateObg.year.length === 2
        && +dateObg.year > currentYear:
        res[index] = `19${dateObg.year}`;
        break;
      case item === "YYYY":
        res[index] = dateObg.year;
        break;
      case item === "YY":
        res[index] = dateObg.year.slice(-2);
        break;
      case item === "MM":
        res[index] = dateObg.month;
        break;
      case item === "DD":
        res[index] = dateObg.day;
        break;
    }
  });

  return res.join(dateObg.separator);
}

module.exports = formatDate;
