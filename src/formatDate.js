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

function getNewFormatYear(fromFormYear, toFormYear, oldFormatYear) {
  let newFormatYear = oldFormatYear;

  if (fromFormYear.length > toFormYear.length) {
    newFormatYear = oldFormatYear.slice(2);
  }

  if (fromFormYear.length < toFormYear.length) {
    newFormatYear = oldFormatYear < 30
      ? 20 + '' + oldFormatYear
      : 19 + '' + oldFormatYear;
  }

  return newFormatYear;
}

function formatDate(date, fromFormat, toFormat) {
  const dateInNewFormat = [];
  const formatDates = date.split(fromFormat[3]);

  const yearIndexFromFormat = fromFormat.indexOf('YY') >= 0
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');

  const yearIndexToFormat = toFormat.indexOf('YY') >= 0
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');

  const yearFromFormat = fromFormat[yearIndexFromFormat];
  const yearToFormat = toFormat[yearIndexToFormat];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD': {
        dateInNewFormat[i] = formatDates[fromFormat.indexOf('DD')];
        break;
      }

      case 'MM': {
        dateInNewFormat[i] = formatDates[fromFormat.indexOf('MM')];
        break;
      }

      case 'YY': {
        dateInNewFormat[i] = getNewFormatYear(yearFromFormat, yearToFormat,
          formatDates[yearIndexFromFormat]);
        break;
      }

      case 'YYYY': {
        dateInNewFormat[i] = getNewFormatYear(yearFromFormat, yearToFormat,
          formatDates[yearIndexFromFormat]);
        break;
      }

      default: {
        break;
      }
    }
  }

  return dateInNewFormat.join(toFormat[3]);
}

module.exports = formatDate;
