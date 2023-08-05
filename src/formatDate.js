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

const getYearIndex
  = format => format.findIndex((elem) => elem === 'YY' || elem === 'YYYY');

function getYear(format, year) {
  if (format === 'YYYY') {
    return +year >= 30 ? +year + 1900 : +year + 2000;
  } else {
    return +year >= 30 ? +year - 1900 : +year - 2000;
  }
}

function formatDate(date, fromFormat, toFormat) {
  // write code here
  const dateValues = date.split(fromFormat[3]);

  const dateObj = {
    [fromFormat[0]]: dateValues[0],
    [fromFormat[1]]: dateValues[1],
    [fromFormat[2]]: dateValues[2],
  };

  const yearToFormat
    = toFormat[getYearIndex(toFormat)];

  const yearFromFormat
    = fromFormat[getYearIndex(fromFormat)];

  if (!dateObj[yearToFormat]) {
    dateObj[yearToFormat] = getYear(yearToFormat, dateObj[yearFromFormat]);
    delete dateObj[yearFromFormat];
  }

  let newDate = toFormat.slice(0, -1).join(toFormat[3]);

  for (const key in dateObj) {
    newDate = newDate.replace(key, dateObj[key]);
  }

  return newDate;
}

module.exports = formatDate;
