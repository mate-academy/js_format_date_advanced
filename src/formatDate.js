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
  const oldFormatDate = date.split(fromFormat[3]);
  const newFormatDate = [];
  let newYearLength = 0;
  let oldYearLength = 0;
  let year,
    month,
    day,
    yearIndex;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = oldFormatDate[i];
      oldYearLength = fromFormat[i].length;
    }

    if (fromFormat[i].includes('M')) {
      month = oldFormatDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = oldFormatDate[i];
    }
  }

  for (const part of toFormat) {
    if (part.includes('Y')) {
      newYearLength = part.length;
    }
  }

  if (newYearLength === 2) {
    yearIndex = toFormat.indexOf('YY');
    newFormatDate[yearIndex] = year.slice(2);
  } else {
    yearIndex = toFormat.indexOf('YYYY');
    newFormatDate[yearIndex] = year;
  }

  if (oldYearLength === 2 && newYearLength === 4) {
    newFormatDate[yearIndex] = '20' + year;

    if (year >= 30) {
      newFormatDate[yearIndex] = '19' + year;
    }
  }

  const monthIndex = toFormat.indexOf('MM');
  const dayIndex = toFormat.indexOf('DD');

  newFormatDate[monthIndex] = month;
  newFormatDate[dayIndex] = day;

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
