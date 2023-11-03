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
  const TO_FORMAT_DATE = [];
  const DATE_ARRAY = date.split(fromFormat[fromFormat.length - 1]);
  const CENTURY_20 = 19;
  const CENTURY_21 = 20;
  const YY_TO_FORMAT = toFormat.indexOf('YY');
  const YYYY_TO_FORMAT = toFormat.indexOf('YYYY');
  const YYYY_FROM_FORMAT = fromFormat.indexOf('YYYY');
  const CHOOSE_CENTURY = 30;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        TO_FORMAT_DATE[j] = DATE_ARRAY[i];
      }

      if (fromFormat.includes('YYYY') && YY_TO_FORMAT !== -1) {
        TO_FORMAT_DATE[YY_TO_FORMAT] = DATE_ARRAY[YYYY_FROM_FORMAT].slice(
          TO_FORMAT_DATE.length - 1
        );
      }

      if (fromFormat.includes('YY') && YYYY_TO_FORMAT !== -1) {
        TO_FORMAT_DATE[YYYY_TO_FORMAT] = DATE_ARRAY[fromFormat.indexOf('YY')];

        if (DATE_ARRAY[fromFormat.indexOf('YY')] < CHOOSE_CENTURY) {
          TO_FORMAT_DATE[YYYY_TO_FORMAT]
            = CENTURY_21 + TO_FORMAT_DATE[YYYY_TO_FORMAT];
        } else {
          TO_FORMAT_DATE[YYYY_TO_FORMAT]
            = CENTURY_20 + TO_FORMAT_DATE[YYYY_TO_FORMAT];
        }
      }
    }
  }

  return TO_FORMAT_DATE.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
