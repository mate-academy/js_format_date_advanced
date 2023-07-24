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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);
  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = dateParts[i];
  }

  let fromYear = '';
  let toYear = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].includes('Y')) {
      fromYear = fromFormat[i];
    }

    if (toFormat[i].includes('Y')) {
      toYear = toFormat[i];
    }
  }

  if (fromYear.length !== toYear.length) {
    const convertedYear = convertYear(dateObject[fromYear], fromYear, toYear);

    delete dateObject[fromYear];
    dateObject[toYear] = convertedYear;
  }

  const newDateParts = toFormat.slice(0, 3).map(part => dateObject[part]);

  return newDateParts.join(toSeparator);
}

function convertYear(year, fromYear, toYear) {
  if (fromYear.length > toYear.length) {
    return year.slice(-2);
  } else if (fromYear.length < toYear.length) {
    return (parseInt(year) >= 30 ? '19' : '20') + year;
  } else {
    return year;
  }
}

module.exports = formatDate;
