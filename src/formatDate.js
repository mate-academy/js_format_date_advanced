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
  const ACTUAL_DATE_ARRAY = date.split(fromFormat[3]);
  let YEAR = 0;
  let MONTH = 0;
  let DAY = 0;

  const resultArray = [];

  for (const fromElem of fromFormat) {
    switch (fromElem) {
      case 'YYYY':
        YEAR = ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;

      case 'YY':
        if (ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)] < 30) {
          YEAR = '20' + ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

          break;
        }

        YEAR = '19' + ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;

      case 'MM':
        MONTH = ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;
      case 'DD':
        DAY = ACTUAL_DATE_ARRAY[fromFormat.indexOf(fromElem)];

        break;
    };
  }

  for (const toElem of toFormat) {
    switch (toElem) {
      case 'YYYY':
        resultArray.push(YEAR);

        break;

      case 'YY':
        resultArray.push(YEAR.slice(2));

        break;

      case 'MM':
        resultArray.push(MONTH);

        break;

      case 'DD':
        resultArray.push(DAY);

        break;
    };
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
