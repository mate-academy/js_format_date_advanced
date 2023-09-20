'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the new `fromFormat` array and the new `toFormat` array. Function returns
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
  const SEPARATOR_POSITION = 3;
  const YEARS_LIMIT = 30;
  const CURRENT_CENTURY = '20';
  const PREVIOUS_CENTURY = '19';
  const YEARS = 'YY';
  const MONTHS = 'MM';
  const DAYS = 'DD';

  const newSeparator = toFormat[SEPARATOR_POSITION];
  const oldIndexes = {
    year: null,
    month: null,
    day: null,
    separator: fromFormat[3],
  };
  const newData = [];

  const yearsHandler = (prevFormat, newFormat, value) => {
    if (prevFormat.length === newFormat.length) {
      return value;
    }

    if (prevFormat.length < newFormat.length) {
      if (value < YEARS_LIMIT) {
        return CURRENT_CENTURY + value;
      }

      return PREVIOUS_CENTURY + value;
    }

    if (prevFormat.length > newFormat.length) {
      return value.slice(-2);
    }
  };

  const oldItems = date.split(oldIndexes.separator);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === DAYS) {
      oldIndexes.day = i;
    }

    if (fromFormat[i] === MONTHS) {
      oldIndexes.month = i;
    }

    if (fromFormat[i].includes(YEARS)) {
      oldIndexes.year = i;
    }
  }

  for (const element of toFormat) {
    if (element.includes(YEARS)) {
      const newYear = yearsHandler(
        fromFormat[oldIndexes.year],
        element,
        oldItems[oldIndexes.year]
      );

      newData.push(newYear);
    }

    if (element.includes(MONTHS)) {
      newData.push(oldItems[oldIndexes.month]);
    }

    if (element.includes(DAYS)) {
      newData.push(oldItems[oldIndexes.day]);
    }
  }

  return newData.join(newSeparator);
}

module.exports = formatDate;
