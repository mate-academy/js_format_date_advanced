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
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  const yearIndexFrom = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');
  const monthIndexFrom = fromFormat.indexOf('MM');
  const dayIndexFrom = fromFormat.indexOf('DD');

  const yearIndexTo = toFormat.includes('YY')
    ? toFormat.indexOf('YY') : toFormat.indexOf('YYYY');
  const monthIndexTo = toFormat.indexOf('MM');
  const dayIndexTo = toFormat.indexOf('DD');

  const yearValue = dateParts[yearIndexFrom];
  const monthValue = dateParts[monthIndexFrom];
  const dayValue = dateParts[dayIndexFrom];

  const newYearFormat = changeYearFormat(yearValue, fromFormat, toFormat);

  const newDate = [];

  newDate[dayIndexTo] = dayValue;
  newDate[monthIndexTo] = monthValue;
  newDate[yearIndexTo] = newYearFormat;

  return newDate.join(toFormat[toFormat.length - 1]);
}

function changeYearFormat(year, formatFrom, formatTo) {
  let newYearFormat = year;

  if (formatFrom.includes('YY') && formatTo.includes('YYYY')) {
    newYearFormat = +year < 30 ? `20${year}` : `19${year}`;
  }

  if (formatFrom.includes('YYYY') && formatTo.includes('YY')) {
    newYearFormat = year.slice(2);
  }

  return newYearFormat;
}

module.exports = formatDate;
