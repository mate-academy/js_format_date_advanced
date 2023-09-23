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
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(fromSeparator);
  const dateMap = new Map();
  const formatedOutput = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const format = fromFormat[i];
    const datePart = dateParts[i];

    if (format === 'YY' || format === 'YYYY') {
      let year = datePart;

      if (year.length < 4) {
        year = convertYear(year);
      }

      dateMap.set('YY', year.slice(-2));
      dateMap.set('YYYY', year);
    } else {
      dateMap.set(format, datePart);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    formatedOutput.push(dateMap.get(toFormat[i]));
  }

  return formatedOutput.join(toSeparator);
}

function convertYear(yearString) {
  const currentYear = new Date().getFullYear();
  const century = Math.floor(currentYear / 100) * 100;
  let fullYear = parseInt(yearString, 10) + century;

  if (yearString.length > 2) {
    return yearString.slice(-2);
  }

  while (fullYear > currentYear) {
    fullYear -= 100;
  }

  return fullYear.toString();
}

module.exports = formatDate;
