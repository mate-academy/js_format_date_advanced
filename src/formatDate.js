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
const CENTURY_INDICATOR = 30;
const CENTURY_21 = '20';
const CENTURY_20 = '19';
const YEAR_FORMAT_OF_4 = 'YYYY';
const YEAR_FORMAT_OF_2 = 'YY';

function formatDate(date, fromFormat, toFormat) {
  const currentSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const splitedDate = date.split(currentSeparator);
  const formatedDate = [];

  formatYear(fromFormat, toFormat, splitedDate);

  for (let i = 0; i < splitedDate.length; i++) {
    formatedDate[i] = findFormatIndex(splitedDate, fromFormat, toFormat, i);
  }

  return formatedDate.join(newSeparator);
}

function findFormatIndex(splitedDate, oldFormat, newFormat, i) {
  return splitedDate[oldFormat.indexOf(newFormat[i])];
}

function formatYear(fromFormat, toFormat, splitedDate) {
  const fromYearIndex = fromFormat.indexOf(YEAR_FORMAT_OF_2)
  + fromFormat.indexOf(YEAR_FORMAT_OF_4) + 1;
  const toYearIndex = toFormat.indexOf(YEAR_FORMAT_OF_2)
  + toFormat.indexOf(YEAR_FORMAT_OF_4) + 1;

  if (fromFormat[fromYearIndex] === toFormat[toYearIndex]) {
    return;
  }

  fromFormat[fromYearIndex] = toFormat[toYearIndex];

  if (fromFormat[fromYearIndex] === YEAR_FORMAT_OF_4) {
    if (+splitedDate[fromYearIndex] < CENTURY_INDICATOR) {
      splitedDate[fromYearIndex] = CENTURY_21 + splitedDate[fromYearIndex];

      return;
    }
    splitedDate[fromYearIndex] = CENTURY_20 + splitedDate[fromYearIndex];

    return;
  }

  splitedDate[fromYearIndex] = splitedDate[fromYearIndex].slice(2);
}

module.exports = formatDate;
