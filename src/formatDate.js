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
  const [oldYear, oldMonth, , oldSeparator] = fromFormat;
  const [newYear, , newDay, newSeparator] = toFormat;
  const [a, b, c] = date.split(oldSeparator);

  const isFirstYear = oldYear.indexOf('Y') > -1;
  const isSecondYear = oldMonth.indexOf('Y') === 0;
  const isFirstYearNew = newYear.indexOf('Y') > -1;
  const shiftDate = isFirstYearNew ? newYear.length : newDay.length;
  let year;

  if (isFirstYear) {
    year = a.slice(`-${shiftDate}`);
  } else {
    year = c.slice(shiftDate);
  }

  if (shiftDate > a.length) {
    year = a < 30 ? '20' + a : '19' + a;
  }

  const newDate = [];

  if (isFirstYearNew) {
    newDate.push(year, b, c);
  } else if (isSecondYear) {
    newDate.push(c, a, b);
  } else if (isFirstYear) {
    newDate.push(c, b, year);
  } else {
    newDate.push(a, b, year);
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
