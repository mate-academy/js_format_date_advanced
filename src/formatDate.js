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
  const startDate = fromFormat.length - 1;
  const endDate = toFormat.length - 1;
  const startSeparator = fromFormat[startDate];
  const endSeparator = toFormat[endDate];
  const dateBasic = date.split(startSeparator);
  const dateFinal = [];

  const day = 'DD';
  const month = 'MM';
  const yearShort = 'YY';
  const yearLong = 'YYYY';

  const dayIndex = fromFormat.indexOf(day);
  const monthIndex = fromFormat.indexOf(month);
  let yearIndex = fromFormat.indexOf(yearShort);

  if (yearIndex === -1) {
    yearIndex = fromFormat.indexOf(yearLong);
  }

  const newDay = dateBasic[dayIndex];
  const newMonth = dateBasic[monthIndex];
  const newYear = dateBasic[yearIndex].slice(-2);
  let newYearLong = 19 + newYear;

  if (newYear < 30) {
    newYearLong = 20 + newYear;
  }

  for (let i = 0; i < endDate; i++) {
    if (toFormat[i] === day) {
      dateFinal.push(newDay);
    } else if (toFormat[i] === month) {
      dateFinal.push(newMonth);
    } else if (toFormat[i] === yearShort) {
      dateFinal.push(newYear);
    } else if (toFormat[i] === yearLong) {
      dateFinal.push(newYearLong);
    }
  }

  return dateFinal.join(endSeparator);
}

module.exports = formatDate;
