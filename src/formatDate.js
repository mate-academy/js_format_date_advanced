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
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  let currentYear = '';
  let currentMonth = '';
  let currentDay = '';
  const oldDateArr = date.split(oldSeparator);
  const newDateArr = [];

  fromFormat.map((el, index) => {
    switch (el[0]) {
      case 'Y':
        currentYear = oldDateArr[index];
        break;
      case 'M':
        currentMonth = oldDateArr[index];
        break;
      case 'D':
        currentDay = oldDateArr[index];
        break;
    }
  });

  toFormat.map((el) => {
    switch (el[0]) {
      case ('Y'):
        if (el.length > currentYear.length) {
          const year = (+currentYear < 30 ? '20' : '19') + currentYear;

          newDateArr.push(year);
        } else if (el.length < currentYear.length) {
          newDateArr.push(currentYear.slice(-2));
        } else {
          newDateArr.push(currentYear);
        }

        break;
      case 'M':
        newDateArr.push(currentMonth);
        break;
      case 'D':
        newDateArr.push(currentDay);
        break;
    }
  });

  return newDateArr.join(newSeparator);
}

module.exports = formatDate;
