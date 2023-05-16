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
  const newDate = [];
  const dateArray = date.split(fromFormat.pop());
  const dayIndex = dateArray[fromFormat.indexOf('DD')];
  const monthIndex = dateArray[fromFormat.indexOf('MM')];
  const yearIndex = dateArray[fromFormat.indexOf('YYYY')];

  let shortYear = dateArray[fromFormat.indexOf('YY')];

  for (let index = 0; index < 3; index++) {
    switch (true) {
      case shortYear < '30': {
        shortYear = '20' + shortYear;

        break;
      }

      case shortYear === '30' || shortYear > '30': {
        shortYear = '19' + shortYear;
      }
    }

    switch (toFormat[index]) {
      case 'DD': {
        newDate[index] = dayIndex;

        break;
      }

      case 'MM': {
        newDate[index] = monthIndex;

        break;
      }

      case 'YY': {
        newDate[index] = yearIndex.slice(2);

        break;
      }

      case 'YYYY': {
        if (fromFormat.indexOf('YYYY') !== -1) {
          newDate[index] = yearIndex;
        } else {
          newDate[index] = shortYear;
        }
      }
    }
  }

  return newDate.join(toFormat.pop());
}

module.exports = formatDate;
