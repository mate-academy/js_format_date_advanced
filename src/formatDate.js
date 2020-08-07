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
  let resultArray = [];
  let y = 0;
  const objDate = {};

  resultArray = date.split(fromFormat[3]);

  for (let x = 0; x < fromFormat.length; x++) {
    if (x === fromFormat.length - 1) {
      objDate.symbol = fromFormat[x];
    }

    for (y; y < resultArray.length;) {
      objDate[fromFormat[x]] = resultArray[y];
      break;
    }
    y++;
  };

  resultArray = [];

  toFormat.forEach(element => {
    switch (element) {
      case 'YYYY':
        resultArray.push(objDate[element]);
        break;

      case 'MM':
        resultArray.push(objDate[element]);
        break;

      case 'DD':
        resultArray.push(objDate[element]);
        break;

      case 'YY':
        resultArray.push(objDate['YYYY'].split('').slice(2, 4).join(''));
        break;

      case 'symbol':
        resultArray.push(objDate[element]);
        break;
    };
  });

  resultArray = resultArray.join(toFormat[3]);

  return resultArray;
}

module.exports = formatDate;
