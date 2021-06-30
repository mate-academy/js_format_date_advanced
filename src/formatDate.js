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
  const dateItems = date.split(fromFormat[3]);
  const fromFormatItems = fromFormat.map(x => x[0]);
  const newDateItems = [];

  for (const dateItem of toFormat) {
    switch (dateItem[0]) {
      case 'Y':
        const year = dateItems[fromFormatItems.indexOf('Y')].slice(-2);

        if (dateItem.length === 2) {
          newDateItems.push(year);
        } else {
          if (year < 30) {
            newDateItems.push('20' + year);
          } else {
            newDateItems.push('19' + year);
          }
        }
        break;
      case 'M':
        const month = dateItems[fromFormatItems.indexOf('M')];

        newDateItems.push(month);
        break;
      case 'D':
        const day = dateItems[fromFormatItems.indexOf('D')];

        newDateItems.push(day);
        break;
      default:
        break;
    }
  }

  return newDateItems.join(toFormat[3]);
}

module.exports = formatDate;
