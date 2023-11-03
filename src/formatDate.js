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

// "use strict";

function formatDate(date, fromFormat, toFormat) {
  const toFormatDate = [];
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const shortYYFormat = toFormat.indexOf('YY');

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        toFormatDate[j] = dateArray[i];
      }

      if (
        fromFormat.includes('YYYY')
        && toFormat.includes('YY')
        && shortYYFormat !== -1
      ) {
        toFormatDate[shortYYFormat] = dateArray[fromFormat.indexOf('YYYY')];

        toFormatDate[shortYYFormat] = toFormatDate[shortYYFormat].slice(
          toFormatDate.length - 1
        );
      }

      if (
        fromFormat.includes('YY')
        && toFormat.includes('YYYY')
        && toFormat.indexOf('YYYY') !== -1
      ) {
        toFormatDate[toFormat.indexOf('YYYY')]
          = dateArray[fromFormat.indexOf('YY')];

        if (dateArray[fromFormat.indexOf('YY')] < 30) {
          toFormatDate[toFormat.indexOf('YYYY')]
            = 20 + toFormatDate[toFormat.indexOf('YYYY')];
        } else {
          toFormatDate[toFormat.indexOf('YYYY')]
            = 19 + toFormatDate[toFormat.indexOf('YYYY')];
        }
      }
    }
  }

  const convertedDate = toFormatDate.join(toFormat[toFormat.length - 1]);

  return convertedDate;
}

module.exports = formatDate;
