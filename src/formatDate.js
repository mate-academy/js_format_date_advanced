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
  const fromSeparator = fromFormat.slice(-1);
  const toSeparator = toFormat.slice(-1);
  const splitedDate = date.split(fromSeparator);
  const dateObj = {};
  const formatedDate = [];

  fromFormat
    .slice(0, fromFormat.length - 1)
    .forEach((formatItem, formatIndex) => {
      const dateItem = splitedDate[formatIndex];

      if (formatItem === 'YYYY') {
        dateObj['YY'] = dateItem.slice(-2);
      }

      if (formatItem === 'YY') {
        const isCurrentCentury = dateItem < 30;
        let fullYear;

        if (isCurrentCentury) {
          fullYear = dateItem.padStart(4, 20);
        } else {
          fullYear = dateItem.padStart(4, 19);
        }

        dateObj['YYYY'] = fullYear;
      }

      dateObj[formatItem] = splitedDate[formatIndex];
    });

  for (const format of toFormat.slice(0, toFormat.length - 1)) {
    formatedDate.push(dateObj[format]);
  }

  return formatedDate.join(toSeparator);
}

module.exports = formatDate;
