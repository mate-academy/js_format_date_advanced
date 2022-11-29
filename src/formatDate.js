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
  const arrOld = [...fromFormat];
  const arrNew = [...toFormat];

  const [data1, data2, data3] = date.split(arrOld[3]);

  arrOld[0] = `${arrOld[0]}` + `${data1}`;
  arrOld[1] = `${arrOld[1]}` + `${data2}`;
  arrOld[2] = `${arrOld[2]}` + `${data3}`;

  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < 3; y++) {
      if (arrNew[i] === 'YYYY' && arrOld[y].length === 4) {
        if (Number(arrOld[y].slice(2)) < 30) {
          arrNew[i] = `${arrOld[y].slice(0, 2)}` + `20` + `${arrOld[y].slice(2)}`;
        } else {
          arrNew[i] = `${arrOld[y].slice(0, 2)}` + `19` + `${arrOld[y].slice(2)}`;
        }
      } else if (arrNew[i] === 'YY' && arrOld[y].length === 8) {
        arrNew[i] = `${arrOld[y].slice(0, 2)}` + `${arrOld[y].slice(6)}`;
      } else {
        if (arrNew[i].slice(0, 1) === arrOld[y].slice(0, 1)) {
          arrNew[i] = arrOld[y];
        }
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    if (arrNew[i].length > 6) {
      arrNew[i] = arrNew[i].slice(4);
    } else {
      arrNew[i] = arrNew[i].slice(2);
    }
  }

  return `${arrNew[0]}${arrNew[3]}${arrNew[1]}${arrNew[3]}${arrNew[2]}`;
}

module.exports = formatDate;
