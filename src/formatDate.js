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
  const arrDate = date.split(`${fromFormat[3]}`);
  const sliceFromFormate = fromFormat.slice(0, 3);
  const sliceToFormate = toFormat.slice(0, 3);
  const realDate = [];
  const separator = toFormat[3];
  let dd;
  let mm;
  let year;

  for (let i = 0; i < sliceFromFormate.length; i++) {
    if (sliceFromFormate[i] === 'DD') {
      dd = arrDate[i];
    }

    if (sliceFromFormate[i] === 'MM') {
      mm = arrDate[i];
    }

    if (sliceFromFormate[i] === 'YYYY') {
      year = arrDate[i];
    }

    if (sliceFromFormate[i] === 'YY') {
      if (arrDate[i] >= 30) {
        year = '19' + arrDate[i];
      } else {
        year = '20' + arrDate[i];
      }
    }
  }

  for (let i = 0; i < sliceToFormate.length; i++) {
    if (sliceToFormate[i] === 'DD') {
      realDate[i] = dd;
    }

    if (sliceToFormate[i] === 'MM') {
      realDate[i] = mm;
    }

    if (sliceToFormate[i] === 'YY') {
      realDate[i] = year.slice(2);
    } else if (sliceToFormate[i] === 'YYYY') {
      realDate[i] = year;
    }
  }

  return realDate.join(`${separator}`);
}

module.exports = formatDate;
