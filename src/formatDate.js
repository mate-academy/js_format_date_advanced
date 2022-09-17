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
  const newSeparator = toFormat[3];
  const clearDate = date.split(fromFormat[3]);
  const fixedDate = [];
  let yearValue = 0;
  let monthValue = 0;
  let dateValue = 0;


  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === 'DD') {
      dateValue = clearDate[i];
    }

    if (fromFormat[i] === 'MM') {
      monthValue = clearDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      yearValue = clearDate[i];
    }

    if (fromFormat[i] === 'YY') {
      yearValue = clearDate[i] > 29 ? '19' + clearDate[i] : '20' + clearDate[i];
    }
  }

  for (let i = 0; i <= 2; i++) {
    if (toFormat[i] === 'DD') {
     fixedDate[i] = dateValue;
    }

    if (toFormat[i] === 'MM') {
      fixedDate[i] = monthValue;
    }

    if (toFormat[i] === 'YYYY') {
      fixedDate[i] = yearValue;
    }

    if (toFormat[i] === 'YY') {
      fixedDate[i] = yearValue.slice(-2);
    }
  }

  return fixedDate.join(newSeparator);
}

module.exports = formatDate;
