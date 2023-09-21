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
  const SEPARATOR_INDEX = 3;
  const YEAR_LIMIT = 30;
  const CENTURY_21 = 20;
  const CENTURY_20 = 19;

  const dateStorage = {
    day: null,
    month: null,
    year: null,

    oldFormat: date.split(fromFormat[SEPARATOR_INDEX]),
    newFormat: [],
  };

  const { oldFormat, newFormat } = dateStorage;
  let { day, month, year } = dateStorage;

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = oldFormat[i];
        break;

      case 'MM':
        month = oldFormat[i];
        break;

      case 'YY':
        year = normalizeYear(oldFormat[i]);
        break;

      case 'YYYY':
        year = normalizeYear(oldFormat[i]);
        break;
    }
  }

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newFormat[i] = day;
        break;

      case 'MM':
        newFormat[i] = month;
        break;

      case 'YY':
        newFormat[i] = year;
        break;

      case 'YYYY':
        newFormat[i] = year;
        break;
    }
  }

  return newFormat.join(toFormat[SEPARATOR_INDEX]);

  function normalizeYear(value) {
    const oldLengthYear = getLengthYear(fromFormat.slice(0, -1));
    const newLengthYear = getLengthYear(toFormat.slice(0, -1));

    if (oldLengthYear < newLengthYear) {
      if (+value < YEAR_LIMIT) {
        return `${CENTURY_21}${value}`;
      }

      return `${CENTURY_20}${value}`;
    }

    if (oldLengthYear > newLengthYear) {
      return value.slice(-2);
    }

    return value;
  }

  function getLengthYear(dateFormat) {
    for (const element of dateFormat) {
      if (element.includes('Y')) {
        return element.length;
      }
    }
  }
}

module.exports = formatDate;
