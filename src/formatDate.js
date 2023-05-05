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
  const fromObj = {};
  const toObj = {};
  const newDate = date.split(fromFormat[fromFormat.length - 1]);
  const fromForm = fromFormat.slice(0, -1);
  const toForm = toFormat.slice(0, -1);
  const separator = toFormat[toFormat.length - 1];

  for (let i = 0; i < fromForm.length; i++) {
    fromObj[fromForm[i]] = newDate[i];
  }

  for (let i = 0; i < toForm.length; i++) {
    if (toForm[i] === 'YYYY' && newDate[i] < 30) {
      toObj[toForm[i]] = fromObj['YYYY'] ? fromObj['YYYY'] : `20${fromObj['YY']}`;
    } else if (toForm[i] === 'YYYY' && newDate[i] >= 30) {
      toObj[toForm[i]] = fromObj['YYYY']
        ? fromObj['YYYY']
        : `19${fromObj['YY']}`;
    } else if (toForm[i] === 'YY') {
      toObj[toForm[i]] = fromObj['YY']
        ? fromObj['YY']
        : fromObj['YYYY'].slice(2);
    } else {
      toObj[toForm[i]] = fromObj[toForm[i]];
    }
  }

  const updated = Object.values(toObj).join(separator).toString();

  return updated;
}

module.exports = formatDate;
