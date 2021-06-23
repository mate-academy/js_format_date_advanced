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
  const splitedData = date.split(fromFormat[3]);
  const separator = toFormat[3];

  const toFormatObject = {};
  const fromFormatObject = {};

  for (let j = 0; j < 3; j++) {
    if (fromFormat[j] === 'YYYY' && toFormat.includes('YY')) {
      fromFormatObject['YY'] = splitedData[j].slice(2);
    } else {
      fromFormatObject[fromFormat[j]] = splitedData[j];
    }

    if (fromFormat[j] === 'YY' && toFormat.includes('YYYY')) {
      fromFormatObject['YYYY'] = addFullNameYear(fromFormatObject.YY);
    }
  }

  for (let i = 0; i < 3; i++) {
    toFormatObject[toFormat[i]] = fromFormatObject[toFormat[i]];
  }

  const modifiedString = Object.values(toFormatObject).join(separator);

  return modifiedString;
}

function addFullNameYear(year) {
  return year >= 30 ? '19' + year : '20' + year;
}

module.exports = formatDate;
