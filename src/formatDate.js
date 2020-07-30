/* eslint-disable max-len */
'use strict';

/*
 * Time flies, standards change. Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let arr = [];
  let y = 0;
  const objDate = {};
  let str = '';
  let YY;

  arr = date.split(fromFormat[3]);

  for (let x = 0; x < fromFormat.length; x++) {
    if (x === fromFormat.length - 1) {
      objDate.symbol = fromFormat[x];
    }

    for (y; y < arr.length;) {
      objDate[fromFormat[x]] = arr[y];
      break;
    }
    y++;
  };

  for (let z = 0; z < toFormat.length; z++) {
    objDate.symbol = toFormat[3];

    if (toFormat[z] === 'YY') {
      objDate[toFormat[z]] = YY;
    }

    for (const key in objDate) {
      if (toFormat[z] === 'YY' && key === 'YYYY') {
        YY = String(objDate[key]).split('').slice(2).join('');
        objDate.YY = YY;
      }

      if (key === toFormat[z]) {
        if (z === toFormat.length - 2) {
          str += objDate[key];
          break;
        }

        str += objDate[key] + objDate.symbol;
      }
    }
  }

  return str;
}

module.exports = formatDate;
