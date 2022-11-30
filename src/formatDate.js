'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a oldSeparator, reorder the date parts of convert a
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
  let oldSeparator = '';
  let newSeparator = '';
  let oldYearIndex = '';
  let oldYearLength = '';
  let oldMonthIndex = '';
  let oldDayIndex = '';
  const newDate = [];

  for (const itemFrom of fromFormat) {
    switch (true) {
      case itemFrom.includes('Y'):
        oldYearIndex = fromFormat.indexOf(itemFrom);
        oldYearLength = itemFrom.length;
        break;

      case itemFrom.includes('M'):
        oldMonthIndex = fromFormat.indexOf(itemFrom);
        break;

      case itemFrom.includes('D'):
        oldDayIndex = fromFormat.indexOf(itemFrom);
        break;

      default:
        oldSeparator = itemFrom;
    }
  }

  const oldDateArray = date.split(`${oldSeparator}`);
  const shortYear = oldDateArray[oldYearIndex].slice(-2);
  const longYear = (shortYear < 30) ? `20${shortYear}` : `19${shortYear}`;

  for (const itemTo of toFormat) {
    switch (true) {
      case itemTo.includes('D'):
        newDate[toFormat.indexOf(itemTo)] = oldDateArray[oldDayIndex];
        break;

      case itemTo.includes('M'):
        newDate[toFormat.indexOf(itemTo)] = oldDateArray[oldMonthIndex];
        break;

      case itemTo.includes('Y'):
        if (oldYearLength === 2) {
          newDate[toFormat.indexOf(itemTo)]
            = (itemTo.length === 2) ? shortYear : longYear;
        } else {
          newDate[toFormat.indexOf(itemTo)]
            = (itemTo.length === 4) ? longYear : shortYear;
        };
        break;

      default:
        newSeparator = itemTo;
    }
  }

  return `${newDate.join(newSeparator)}`;
}

module.exports = formatDate;
