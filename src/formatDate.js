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
  const result = date.split(/,|-|\.|\//);
  const objDate = {
    [`${fromFormat[0]}`]: result[0],
    [`${fromFormat[1]}`]: result[1],
    [`${fromFormat[2]}`]: result[2],
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (!objDate.hasOwnProperty(toFormat[i])) {
      if (toFormat[i] === 'YYYY') {
        objDate['YYYY'] = +objDate['YY'] >= 30
          ? '19' + objDate['YY']
          : '20' + objDate['YY'];
        delete objDate['YY'];
      }

      if (toFormat[i] === 'YY') {
        objDate['YY'] = objDate['YYYY'].slice(2);
        delete objDate['YYYY'];
      }
    }
  }

  let newDate = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (const smth in objDate) {
      if (smth === toFormat[i]) {
        newDate += objDate[smth];

        if (i !== toFormat.length - 2) {
          newDate += toFormat[3];
        }
      }
    }
  }

  return newDate;
}

module.exports = formatDate;
