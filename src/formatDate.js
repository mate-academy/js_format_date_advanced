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
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_FORMAT_LONG = 'YYYY';
  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const THIS_CENTURY = 20;
  const PREV_CENTURY = 19;
  const MAX_YEAR_FOR_THIS_CENTURY = 30;

  const resultDate = [];
  const resultSeparator = toFormat[3];

  const dateParts = date.split(fromFormat[3]);
  const year
    = dateParts[fromFormat.indexOf(YEAR_FORMAT_SHORT)]
    || dateParts[fromFormat.indexOf(YEAR_FORMAT_LONG)];
  const month = dateParts[fromFormat.indexOf(MONTH_FORMAT)];
  const day = dateParts[fromFormat.indexOf(DAY_FORMAT)];

  for (let i = 0; i < (toFormat.length - 1); i++) {
    switch (toFormat[i]) {
      case DAY_FORMAT:
        resultDate[i] = day;
        break;

      case MONTH_FORMAT:
        resultDate[i] = month;
        break;

      case YEAR_FORMAT_LONG:
        if (year.length === YEAR_FORMAT_LONG.length) {
          resultDate[i] = year;
        } else {
          resultDate[i] = year < MAX_YEAR_FOR_THIS_CENTURY
            ? THIS_CENTURY + year
            : PREV_CENTURY + year;
        }
        break;

      case YEAR_FORMAT_SHORT:
        if (year.length === YEAR_FORMAT_SHORT.length) {
          resultDate[i] = year;
        } else {
          resultDate[i] = year.slice(-2);
        }
        break;

      default:
        break;
    }
  }

  return resultDate.join(resultSeparator);
}

module.exports = formatDate;
