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
  const format = {};
  const newFormat = [];
  const dateInArray = date.match(/\d{2,4}/g);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    format[fromFormat[i]] = dateInArray[i];

    if (dateInArray[i].length === 4) {
      format['YY'] = dateInArray[i].slice(2, 4);
    };
  };

  if (typeof format.YYYY === 'undefined') {
    if (format.YY < 30) {
      format['YYYY'] = '20' + format.YY;
    } else if (format.YY >= 30) {
      format['YYYY'] = '19' + format.YY;
    } else {
      format['YYYY'] = format.YY + '\'';
    };
  };

  for (let j = 0; j < toFormat.length - 1; j++) {
    for (const key in format) {
      if (key === toFormat[j]) {
        newFormat.push(format[key]);
      };
    };
  };

  return newFormat.join(toFormat[3]);
};

module.exports = formatDate;
