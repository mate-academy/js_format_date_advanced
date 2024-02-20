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
  const currentFormat = {};
  const newFormat = [];
  const OLD_SEPARATOR = fromFormat[3];
  const NEW_SEPARATOR = toFormat[3];
  const DATE = date.split(OLD_SEPARATOR);
  const DAY = 'DD';
  const MONTH = 'MM';
  const YEAR_SHORT = 'YY';
  const YEAR_LONG = 'YYYY';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    currentFormat[fromFormat[i]] = DATE[i];
  }

  for (const value of toFormat.slice(0, -1)) {
    let current = currentFormat[value];

    if (!currentFormat[value]) {
      current = (value === YEAR_SHORT)
        ? currentFormat[YEAR_LONG]
        : currentFormat[YEAR_SHORT];
    }

    switch (value) {
      case DAY:
        newFormat.push(current);
        break;

      case MONTH:
        newFormat.push(current);
        break;

      case YEAR_SHORT:
        newFormat.push(current.slice(2));
        break;

      case YEAR_LONG:
        if (current.length === 4) {
          newFormat.push(current);
        } else if (current >= 30) {
          newFormat.push('19' + current);
        } else {
          newFormat.push('20' + current);
        }

        break;

      default: return 'invalid data';
    }
  }

  return newFormat.join(NEW_SEPARATOR);
}

module.exports = formatDate;
