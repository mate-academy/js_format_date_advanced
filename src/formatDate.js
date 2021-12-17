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
  const fromFormatSeparator = fromFormat[3];
  const toFormatSeparator = toFormat[3];

  const fromYearFormat = fromFormat.find(item => item.includes('Y'));
  const toYearFormat = toFormat.find(item => item.includes('Y'));

  const dateToFormat = date.split(fromFormatSeparator);

  const yearIndex = fromFormat.indexOf(fromYearFormat);
  const monthIndex = fromFormat.indexOf('MM');
  const dayIndex = fromFormat.indexOf('DD');

  let dateYear = dateToFormat[yearIndex];
  const dateMonth = dateToFormat[monthIndex];
  const dateDay = dateToFormat[dayIndex];

  const dateYearShortened = +(dateYear.slice(0, 2));

  const result = [];

  if (fromYearFormat.length > toYearFormat.length) {
    dateYear = dateYear.slice(2);
  }

  if (fromYearFormat.length < toYearFormat.length
    && dateYearShortened < 30) {
    dateYear = '20' + dateYear;
  }

  if (fromYearFormat.length < toYearFormat.length
    && dateYearShortened >= 30) {
    dateYear = '19' + dateYear;
  }

  for (const item of toFormat) {
    if (item === 'DD') {
      result.push(dateDay);
    }

    if (item === 'MM') {
      result.push(dateMonth);
    }

    if (item === 'YY' || item === 'YYYY') {
      result.push(dateYear);
    }
  }

  return result.join(toFormatSeparator);
}

module.exports = formatDate;
