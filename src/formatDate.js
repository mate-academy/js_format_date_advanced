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
  const YEAR_SHORT_FORMAT = 'YY';
  const YEAR_LONG_FORMAT = 'YYYY';
  const SEPARATOR_INDEX = 3;
  const MIN_YEAR_FOR_20_CENTURY = 30;

  const dateFromFormat = date.split(fromFormat[SEPARATOR_INDEX]);
  const dateToFormat = [];

  for (let i = 0; i < dateFromFormat.length; i++) {
    const value = dateFromFormat[i];
    let index = toFormat.indexOf(fromFormat[i]);

    if (index !== -1) {
      dateToFormat[index] = value;
      continue;
    }

    if (fromFormat[i] === YEAR_LONG_FORMAT) {
      index = toFormat.indexOf(YEAR_SHORT_FORMAT);
      dateToFormat[index] = value.slice(2);
      continue;
    }

    if (fromFormat[i] === YEAR_SHORT_FORMAT) {
      index = toFormat.indexOf(YEAR_LONG_FORMAT);

      dateToFormat[index] = (
        +value < MIN_YEAR_FOR_20_CENTURY
          ? `20${value}`
          : `19${value}`
      );
    }
  }

  if (dateToFormat.length !== 3 || dateToFormat.includes(undefined)) {
    return 'Invalid data';
  }

  return dateToFormat.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
