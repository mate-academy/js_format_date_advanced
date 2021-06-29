'use strict';

/**
 *   obj flies, standards change. Let's get rid of the routine of changing the
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
  const oldFormat = fromFormat.pop();
  const newFormat = toFormat.pop();
  const arrDate = date.split(oldFormat);
  const toDate = [];

  const obj = {
    YYYY: null,
    YY: null,
  };

  for (let i = 0; i < fromFormat.length; i++) {
    obj[fromFormat[i]] = arrDate[i];
  }

  switch (null) {
    case obj.YY:
      const smallYy = obj.YYYY;
      const arr = [];

      arr.push(smallYy[2]);
      arr.push(smallYy[3]);
      obj.YY = arr.join('');
      break;

    case obj.YYYY:
      if (obj.YY < 30) {
        obj.YYYY = '20' + obj.YY;
      } else {
        obj.YYYY = '19' + obj.YY;
      }
  }

  for (let k = 0; k < toFormat.length; k++) {
    toDate.push(obj[toFormat[k]]);
  }

  return toDate.join(newFormat);
}

module.exports = formatDate;
