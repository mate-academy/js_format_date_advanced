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
  const CENTURY_THRESHOLD = 30;
  const DATE_FORMAT_LENGTH = 3;

  const inputSeparator = fromFormat[3];
  const outputSeparator = toFormat[3];
  const structuredDate = {};
  const separatedInputDate = date.split(inputSeparator);

  for (let i = 0; i < DATE_FORMAT_LENGTH; i++) {
    structuredDate[fromFormat[i]] = separatedInputDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    structuredDate['YYYY'] =
      +structuredDate['YY'] < CENTURY_THRESHOLD
        ? '20' + structuredDate['YY']
        : '19' + structuredDate['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    structuredDate['YY'] = structuredDate['YYYY'].slice(2);
  }

  let resultDate = '';

  for (let i = 0; i < DATE_FORMAT_LENGTH; i++) {
    resultDate += structuredDate[toFormat[i]];
    resultDate += outputSeparator;
  }

  return resultDate.slice(0, -1);
}

module.exports = formatDate;
