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
  const dateObj = initOjectDate(date, fromFormat);

  return formResultDate(dateObj, toFormat);
}

function formResultDate(dateObj, toFormat) {
  const toSeparator = toFormat[3];
  let resultDate = String();

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        resultDate += convertYear(dateObj.year, toFormat[i]) + toSeparator;
        break;
      case 'DD':
        resultDate += dateObj.day + toSeparator;
        break;
      case 'MM':
        resultDate += dateObj.month + toSeparator;
    }
  }

  return resultDate.substr(0, resultDate.length - 1);
}

function initOjectDate(date, fromFormat) {
  const fromSeparator = fromFormat[3];
  const dateArr = date.split(fromSeparator);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i].charAt(0)) {
      case 'Y':
        dateObj.year = dateArr[i];
        break;
      case 'M':
        dateObj.month = dateArr[i];
        break;
      case 'D':
        dateObj.day = dateArr[i];
        break;
    }
  }

  return dateObj;
}

function convertYear(value, mapping) {
  if (value.length >= mapping.length) {
    return value.substr(value.length - mapping.length, mapping.length);
  }

  return Number(value) < 30 ? '20' + value : '19' + value;
}

module.exports = formatDate;
