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
  const oldFormat = [...fromFormat];
  const newFormat = [...toFormat];
  const oldSeperator = oldFormat.pop();
  const newSeperator = newFormat.pop();
  const dateItems = date.split(oldSeperator);
  const result = [];

  for (let i = 0; i < dateItems.length; i++) {
    if (newFormat[i].includes('D')) {
      result.push(dateItems[foundIndex(oldFormat, 'D')]);
    }

    if (newFormat[i].includes('M')) {
      result.push(dateItems[foundIndex(oldFormat, 'M')]);
    }

    if (newFormat[i].includes('Y')) {
      let year = dateItems[foundIndex(oldFormat, 'Y')];
      const oldFormatYear = oldFormat[foundIndex(oldFormat, 'Y')];
      const newFormatYear = newFormat[foundIndex(newFormat, 'Y')];

      if (oldFormatYear.length > newFormatYear.length) {
        year = year.slice(-2);
      }

      if (oldFormatYear.length < newFormatYear.length) {
        const millennium = year < 30 ? 20 : 19;

        year = millennium + year;
      }

      result.push(year);
    }
  }

  return result.join(newSeperator);
}

function foundIndex(oldFormatItems, partDate) {
  for (let i = 0; i < oldFormatItems.length; i++) {
    if (oldFormatItems[i].includes(partDate)) {
      return i;
    }
  }
}

module.exports = formatDate;
