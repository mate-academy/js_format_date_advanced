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
  const fromDate = parseFromDate(date, fromFormat);
  const toDate = [];
  const separator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    const item = toFormat[i];

    if (item === 'YY') {
      const year = +fromDate['YYYY'];

      if (year < 2000) {
        toDate.push(year - 1900);
      } else {
        toDate.push(year - 2000);
      }
    } else {
      toDate.push(fromDate[item]);
    }
  }

  return toDate.join(separator);
}

function parseFromDate(date, dateFormat) {
  const separator = dateFormat[3];
  const dateArray = date.split(separator);
  const procesingDate = {};

  for (let i = 0; i < dateArray.length; i++) {
    let key = dateFormat[i];
    let value = dateArray[i];

    if (key === 'YY') {
      key = 'YYYY';

      if (value < 30) {
        value = '20' + value;
      } else {
        value = '19' + value;
      }
    }

    procesingDate[key] = value;
  }

  return procesingDate;
}

module.exports = formatDate;
