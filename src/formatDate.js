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
  // write code here
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  let year, month, day;

  const dateArr = date.split(fromSeparator);

  const result = [];

  for (const i in fromFormat) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = dateArr[i];
        break;
      case 'MM':
        month = dateArr[i];
        break;
      case 'DD':
        day = dateArr[i];
        break;
    }
  }

  if (year && month && day) {
    for (const i in toFormat) {
      switch (toFormat[i]) {
        case 'YY':
        case 'YYYY':
          if (toFormat[i] === 'YYYY' && year.length === 2) {
            if (+year < 30) {
              year = '20' + year;
            } else {
              year = '19' + year;
            }
          } else if (toFormat[i] === 'YY' && year.length === 4) {
            year = year.slice(2, year.length);
          }
          result.push(year);
          break;
        case 'MM':
          result.push(month);
          break;
        case 'DD':
          result.push(day);
          break;
      }
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
