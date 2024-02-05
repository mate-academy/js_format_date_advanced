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
  const FROM_SEPARATOR = fromFormat[fromFormat.length - 1];
  const TO_SEPARATOR = toFormat[toFormat.length - 1];

  const DAY = 'DD';
  const MONTH = 'MM';
  const SHORT_YEAR = 'YY';
  const FULL_YEAR = 'YYYY';

  let dayValue;
  let monthValue;
  let yearValue;

  const dateArray = date.split(FROM_SEPARATOR);
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case DAY:
        dayValue = dateArray[i];
        break;
      case MONTH:
        monthValue = dateArray[i];
        break;
      case SHORT_YEAR:
        yearValue = dateArray[i];
        break;
      case FULL_YEAR:
        yearValue = dateArray[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case DAY:
        result.push(dayValue);
        break;
      case MONTH:
        result.push(monthValue);
        break;
      case SHORT_YEAR:
        if (yearValue.length > 2) {
          yearValue = yearValue.slice(2);
        }
        result.push(yearValue);
        break;
      case FULL_YEAR:
        if (yearValue.length < 4) {
          if (+yearValue < 30) {
            yearValue = `20${yearValue}`;
          } else {
            yearValue = `19${yearValue}`;
          }
        }
        result.push(yearValue);
        break;
    }
  }

  return result.join(TO_SEPARATOR);
}

module.exports = formatDate;
