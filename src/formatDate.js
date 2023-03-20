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
  const givenSeparator = fromFormat[3];
  const givenDate = date.split(givenSeparator);
  const newSeparator = toFormat[3];
  const newDate = {
    day: 0,
    month: 0,
    year: 0,
  };
  const newDateFormat = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      newDate.day = givenDate[i];
    } else if (fromFormat[i] === 'MM') {
      newDate.month = givenDate[i];
    } else {
      newDate.year = givenDate[i];
    }
  }

  const makeFullYear = (year) => {
    return year < 30 ? `20${year}` : `19${year}`;
  };

  if (newDate.year.length < 4) {
    newDate.year = makeFullYear(newDate.year);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDateFormat.push(newDate.day);
    } else if (toFormat[i] === 'MM') {
      newDateFormat.push(newDate.month);
    } else if (toFormat[i] === 'YYYY') {
      newDateFormat.push(newDate.year);
    } else {
      newDateFormat.push(newDate.year.slice(-2));
    }
  }

  return newDateFormat.join(newSeparator);
}

module.exports = formatDate;
