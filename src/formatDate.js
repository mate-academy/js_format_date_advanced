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
  const arrDate = date.split(fromFormat[3]);
  const update = [];
  let yearIndex = 0;
  let monthIndex = 0;
  let dayIndex = 0;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      yearIndex = i;
    }

    if (fromFormat[i] === 'MM') {
      monthIndex = i;
    }

    if (fromFormat[i] === 'DD') {
      dayIndex = i;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YY') {
      update.push(arrDate[yearIndex].slice(2));
    }

    if (toFormat[i] === 'YYYY') {
      if (fromFormat.includes('YY')) {
        if (arrDate[yearIndex] < 30) {
          update.push('20' + arrDate[yearIndex]);
        } else {
          update.push('19' + arrDate[yearIndex]);
        }
      } else {
        update.push(arrDate[yearIndex]);
      }
    }

    if (toFormat[i] === 'MM') {
      update.push(arrDate[monthIndex]);
    }

    if (toFormat[i] === 'DD') {
      update.push(arrDate[dayIndex]);
    }
  }

  return update.join(toFormat[3]);
}

module.exports = formatDate;
