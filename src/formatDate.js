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
  const CENTURY_SEPARATOR = 30;
  const FORMAT_VALUES = 3;
  const YEAR_FORMAT_LONG = 'YYYY';
  const YEAR_FORMAT_SHORT = 'YY';
  const YEAR_LONG_TO_SHORT_START = 2;
  const YEAR_LONG_TO_SHORT_END = 4;

  const SEPARATOR_FROM = fromFormat[3];
  const SEPARATOR_TO = toFormat[3];
  const DATE_VALUES = date.split(SEPARATOR_FROM);

  const fromDate = {};
  const toDate = [];

  for (let i = 0; i < FORMAT_VALUES; i++) {
    fromDate[fromFormat[i]] = DATE_VALUES[i];

    if (fromFormat[i] === YEAR_FORMAT_SHORT) {
      fromDate[YEAR_FORMAT_LONG]
        = DATE_VALUES[i] < CENTURY_SEPARATOR
          ? `20${DATE_VALUES[i]}`
          : `19${DATE_VALUES[i]}`;
    }

    if (fromFormat[i] === YEAR_FORMAT_LONG) {
      fromDate[YEAR_FORMAT_SHORT]
        = DATE_VALUES[i]
          .slice(YEAR_LONG_TO_SHORT_START, YEAR_LONG_TO_SHORT_END);
    }
  }

  for (let i = 0; i < FORMAT_VALUES; i++) {
    toDate.push(fromDate[toFormat[i]]);
  }

  return toDate.join(SEPARATOR_TO);
}

module.exports = formatDate;
