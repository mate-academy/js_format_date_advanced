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
  const formatingArray = Array(3);

  const separateOldFormat = fromFormat[fromFormat.length - 1];

  let indexOldYear;
  const indexOldMonth = fromFormat.indexOf('MM');
  const indexOldDays = fromFormat.indexOf('DD');

  let indexNewYear;
  const indexNewMonth = toFormat.indexOf('MM');
  const indexNewDays = toFormat.indexOf('DD');

  if (toFormat.includes('YYYY')) {
    indexNewYear = toFormat.indexOf('YYYY');
  } else if (toFormat.includes('YYY')) {
    indexNewYear = toFormat.indexOf('YYY');
  } else if (toFormat.includes('YY')) {
    indexNewYear = toFormat.indexOf('YY');
  }

  if (fromFormat.includes('YYYY')) {
    indexOldYear = fromFormat.indexOf('YYYY');
  } else if (fromFormat.includes('YYY')) {
    indexOldYear = fromFormat.indexOf('YYY');
  } else if (fromFormat.includes('YY')) {
    indexOldYear = fromFormat.indexOf('YY');
  }

  const symbolsSplited = date.split(`${separateOldFormat}`);

  const joinedseparateOldFormat = toFormat[toFormat.length - 1];

  formatingArray[indexNewMonth] = symbolsSplited[indexOldMonth];
  formatingArray[indexNewDays] = symbolsSplited[indexOldDays];
  formatingArray[indexNewYear] = symbolsSplited[indexOldYear];

  if (toFormat[indexNewYear].length >= 3
    && fromFormat[indexOldYear].length <= 2) {
    if (formatingArray[indexNewYear].slice(0, 1) === '2'
    || formatingArray[indexNewYear].slice(0, 1) === '0') {
      formatingArray[indexNewYear] = +formatingArray[indexNewYear] + 2000;
    } else {
      formatingArray[indexNewYear] = +formatingArray[indexNewYear] + 1900;
    }
  }

  if (toFormat[indexNewYear].length <= 2) {
    formatingArray[indexNewYear]
    = formatingArray[indexNewYear].slice(2, formatingArray.length + 1);
  }

  return formatingArray.join(`${joinedseparateOldFormat}`);
}

module.exports = formatDate;
