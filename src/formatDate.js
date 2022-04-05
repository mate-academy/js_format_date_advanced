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
  const splitterFrom = fromFormat[fromFormat.length - 1];
  const splitterTo = toFormat[toFormat.length - 1];
  const result = [];
  const newDate = date.split(splitterFrom);

  let fromYearIndex = 0;
  let fromMonthIndex = 0;
  let fromDayIndex = 0;

  let toYearIndex = 0;
  let toMonthIndex = 0;
  let toDayIndex = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        fromYearIndex = i;
        break;
      case 'YY':
        if (newDate[i] >= 30) {
          newDate[i] = 1900 + Number(newDate[i]);
        } else {
          newDate[i] = 2000 + Number(newDate[i]);
        }
        fromYearIndex = i;
        break;
      case 'MM':
        fromMonthIndex = i;
        break;
      case 'DD':
        fromDayIndex = i;
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        toYearIndex = i;
        break;
      case 'YY':
        newDate[i] = newDate[i] % 100;
        toYearIndex = i;
        break;
      case 'MM':
        toMonthIndex = i;
        break;
      case 'DD':
        toDayIndex = i;
        break;
    }
  }

  result[toYearIndex] = newDate[fromYearIndex];
  result[toDayIndex] = newDate[fromDayIndex];
  result[toMonthIndex] = newDate[fromMonthIndex];

  return result.join(splitterTo);
}

module.exports = formatDate;
