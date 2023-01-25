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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const arrayOfDate = date.split(oldSeparator);
  const resultDate = [];
  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    const part = fromFormat[i];

    if (part.includes('Y')) {
      year = arrayOfDate[i];
    }

    if (part.includes('M')) {
      month = arrayOfDate[i];
    }

    if (part.includes('D')) {
      day = arrayOfDate[i];
    }
  }

  for (const format of toFormat) {
    if (format.includes('Y')) {
      if (format.length < year.length) {
        resultDate.push(year.slice(2));
      } else {
        resultDate.push(year.padStart(format.length, year >= 30 ? '19' : '20'));
      }
    }

    if (format.includes('M')) {
      resultDate.push(month);
    }

    if (format.includes('D')) {
      resultDate.push(day);
    }
  }

  return resultDate.join(newSeparator);
}

module.exports = formatDate;
