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
  const dateArray = date.split(fromFormat[3]);
  let y = -1;
  let m = -1;
  let d = -1;

  for (let i = 0; i < dateArray.length; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      y = i;
    }

    if (fromFormat[i] === 'MM') {
      m = i;
    }

    if (fromFormat[i] === 'DD') {
      d = i;
    }
  }

  const arrayDateNew = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      if (fromFormat[y] === 'YY' && toFormat[i] === 'YYYY') {
        if (Number(dateArray[y]) >= 30) {
          arrayDateNew.push('19' + dateArray[y]);
        } else {
          arrayDateNew.push('20' + dateArray[y]);
        }
      } else if (fromFormat[y] === 'YYYY' && toFormat[i] === 'YY') {
        arrayDateNew.push(dateArray[y].slice(2, 4));
      } else {
        arrayDateNew.push(dateArray[y]);
      }
    }

    if (toFormat[i] === 'MM') {
      arrayDateNew.push(dateArray[m]);
    }

    if (toFormat[i] === 'DD') {
      arrayDateNew.push(dateArray[d]);
    }
  }

  const result = arrayDateNew.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
