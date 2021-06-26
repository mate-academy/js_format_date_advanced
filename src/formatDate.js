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
  const x = fromFormat[3];
  const y = toFormat[3];

  const dateArr = date.split(x);
  const startDate = [];
  const res = [];

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      startDate.push(dateArr[i]);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'MM') {
      startDate.push(dateArr[i]);
    }
  }

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      startDate.push(dateArr[i]);
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD': res.push(startDate[0]);
        break;
      case 'MM': res.push(startDate[1]);
        break;
      case 'YY': if (startDate[2].length > 2) {
        res.push(startDate[2].substring(2));
      } else {
        res.push(startDate[2]);
      };
        break;

      case 'YYYY': if (startDate[2].length > 2) {
        res.push(startDate[2]);
      } else {
        if (parseInt(startDate[2]) < 30) {
          startDate[2] = '20' + startDate[2];
          res.push(startDate[2]);
        } else {
          startDate[2] = '19' + startDate[2];
          res.push(startDate[2]);
        }
      }
    }
  }

  const str = res.join(y);

  return str;
}

module.exports = formatDate;
