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
  const dateParts = date.split(fromFormat[3]);
  let yearIndex = 0;
  let monthIndex = 0;
  let dayIndex = 0;

  const result = [0, 0, 0];

  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === 'YY') {
      yearIndex = i;
    } else if (fromFormat[i] === 'YYYY') {
      yearIndex = i;
    }

    if (fromFormat[i] === 'DD') {
      dayIndex = i;
    }

    if (fromFormat[i] === 'MM') {
      monthIndex = i;
    }
  }

  for (let k = 0; k <= 2; k++) {
    if (toFormat[k] === 'YY') {
      if (fromFormat[yearIndex] === 'YYYY') {
        result[k] = dateParts[yearIndex].slice(2);
      } else {
        result[k] = dateParts[yearIndex];
      }
    } else if (toFormat[k] === 'YYYY') {
      if (fromFormat[yearIndex] === 'YY') {
        if (dateParts[yearIndex] >= 30) {
          result[k] = 19 + dateParts[yearIndex];
        } else if (dateParts[yearIndex] < 30) {
          result[k] = 20 + dateParts[yearIndex];
        }
      } else {
        result[k] = dateParts[yearIndex];
      }
    }

    if (toFormat[k] === 'DD') {
      result[k] = dateParts[dayIndex];
    }

    if (toFormat[k] === 'MM') {
      result[k] = dateParts[monthIndex];
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
