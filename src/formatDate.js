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
  const delimiter = fromFormat[fromFormat.length - 1];
  const parts = date.split(delimiter);
  let newDate = '';

  const YEAR_FULL = 'YYYY';
  const YEAR_SHORT = 'YY';
  const MONTH = 'MM';
  const DAY = 'DD';

  const hasFullYear = fromFormat.includes(YEAR_FULL);
  const hasShortYear = fromFormat.includes(YEAR_SHORT);
  const yearIndex = hasShortYear
    ? fromFormat.indexOf(YEAR_SHORT)
    : hasFullYear
      ? fromFormat.indexOf(YEAR_FULL)
      : -1;

  for (let i = 0; i < toFormat.length; i++) {
    switch (true) {
      case toFormat[i].includes(YEAR_SHORT):
        if (hasFullYear && toFormat[i] === YEAR_SHORT) {
          const twoDigitYear = parseInt(
            parts[yearIndex], 10
          ).toString().slice(-2);

          newDate += twoDigitYear;
        } else if (hasShortYear) {
          const twoDigitYear = parseInt(parts[yearIndex], 10);
          const fullYear = twoDigitYear < 30 ? 2000
          + twoDigitYear : 1900 + twoDigitYear;

          newDate += fullYear;
        } else {
          newDate += parts[yearIndex];
        }
        break;

      case toFormat[i] === MONTH:
        newDate += parts[fromFormat.indexOf(MONTH)];
        break;

      case toFormat[i] === DAY:
        newDate += parts[fromFormat.indexOf(DAY)];
        break;
    }

    if (i !== toFormat.length - 1
      && toFormat[i + 1] !== toFormat[toFormat.length - 1]) {
      newDate += toFormat[toFormat.length - 1];
    }
  }

  return newDate;
}

module.exports = formatDate;
