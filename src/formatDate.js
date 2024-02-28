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
  date = date.split(fromFormat[3]);

  // Parse date from string
  const parsedDate = parseDate(date, fromFormat);

  // Convert year to desired format
  const convertedYear = convertYear(parsedDate.year, parsedDate.year_format, toFormat);

  // Format date
  const result = toFormat.slice(0, 3).join(toFormat[3])
    .replace('DD', parsedDate.day)
    .replace('MM', parsedDate.month)
    .replace('YYYY', convertedYear)
    .replace('YY', convertedYear);

  return result;
}

function convertYear(year, originalFormat, toFormat) {
  if (toFormat.includes('YY') && originalFormat === 'YYYY') {
    return year.slice(2, 4);
  }

  if (toFormat.includes('YYYY') && originalFormat === 'YY') {
    return +year < 30
      ? '20' + year
      : '19' + year;
  }

  return year;
}

function parseDate(date, format) {
  let parsedDate = {}

  if (format.includes('YY')) {
    parsedDate['year_format'] = 'YY';
    parsedDate['year'] = date[format.indexOf('YY')];
  } else {
    parsedDate['year_format'] = 'YYYY';
    parsedDate['year'] = date[format.indexOf('YYYY')];
  }

  parsedDate['day'] = date[format.indexOf('DD')];
  parsedDate['month'] = date[format.indexOf('MM')];

  return parsedDate;
}

module.exports = formatDate;
