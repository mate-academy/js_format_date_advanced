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
  const oldDate = date.split(fromFormat[3]);
  const newFormat = [];
  let yearShort, yearLong, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY') {
      yearLong = oldDate[i];
    } else if (fromFormat[i] === 'YY') {
      yearShort = oldDate[i];
    } else if (fromFormat[i] === 'MM') {
      month = oldDate[i];
    } else if (fromFormat[i] === 'DD') {
      day = oldDate[i];
    }
  }

  for (let j = 0; j < fromFormat.length - 1; j++) {
    if (toFormat[j] === 'YYYY' && yearShort < 30) {
      newFormat.push(yearLong !== undefined ? yearLong : 20 + yearShort);
    } else if (toFormat[j] === 'YYYY' && yearShort >= 30) {
      newFormat.push(yearLong !== undefined ? yearLong : 19 + yearShort);
    } else if (toFormat[j] === 'YYYY') {
      newFormat.push(yearLong);
    } else if (toFormat[j] === 'YY') {
      newFormat.push(
        yearShort !== undefined
          ? yearShort
          : yearLong.split('').splice(2, 2).join('')
      );
    } else if (toFormat[j] === 'YY') {
      newFormat.push(yearShort);
    } else if (toFormat[j] === 'MM') {
      newFormat.push(month);
    } else if (toFormat[j] === 'DD') {
      newFormat.push(day);
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
