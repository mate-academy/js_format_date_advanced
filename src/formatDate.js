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
  const oldDate = date.split(fromFormat[3], 3);
  const rightDate = {
    'YYYY': null,
    'YY': null,
    'MM': null,
    'DD': null,
  };

  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      rightDate[fromFormat[i]] = (+oldDate[i]);
    } else {
      rightDate[fromFormat[i]] = oldDate[i];
    }
  }

  if (rightDate['YYYY'] !== null) {
    rightDate['YY'] = rightDate['YYYY'] % 100;
  } else if (rightDate['YY'] < 30 && rightDate['YY'] >= 0) {
    rightDate['YYYY'] = rightDate['YY'] + 2000;
  } else if (rightDate['YY'] >= 30) {
    rightDate['YYYY'] = rightDate['YY'] + 1900;
  };

  const resultArr = [];

  for (let i = 0; i <= 2; i++) {
    resultArr.push(rightDate[toFormat[i]]);
  };

  const result = resultArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
