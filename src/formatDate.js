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
  if (fromFormYear.length > toFormYear.length) {
    return oldFormatYear.slice(2);
  }

  if (fromFormYear.length < toFormYear.length) {
    const newFormattedYear = oldFormatYear < 30
      ? '20' + oldFormatYear
      : '19' + oldFormatYear;

    return newFormattedYear;
  }

  return oldFormatYear;
}

function formatDate(date, fromFormat, toFormat) {
  const formattedDate = [];
  const splittedOldDate = date.split(fromFormat[3]);
  const shortYearFormat = 'YY';
  const longYearFormat = 'YYYY';

  const yearIndexFromFormat = Math.max(fromFormat.indexOf(shortYearFormat),
    fromFormat.indexOf(longYearFormat));

  const yearIndexToFormat = Math.max(toFormat.indexOf(shortYearFormat),
    toFormat.indexOf(longYearFormat));

  const yearFromFormat = fromFormat[yearIndexFromFormat];
  const yearToFormat = toFormat[yearIndexToFormat];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD': {
        formattedDate[i] = splittedOldDate[fromFormat.indexOf('DD')];
        break;
      }

      case 'MM': {
        formattedDate[i] = splittedOldDate[fromFormat.indexOf('MM')];
        break;
      }

      case shortYearFormat: {
        formattedDate[i] = getNewFormatYear(yearFromFormat, yearToFormat,
          splittedOldDate[yearIndexFromFormat]);
        break;
      }

      default: {
        formattedDate[i] = getNewFormatYear(yearFromFormat, yearToFormat,
          splittedOldDate[yearIndexFromFormat]);
        break;
      }
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
