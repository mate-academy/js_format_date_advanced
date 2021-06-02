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
  const fromFormatSeparator = fromFormat[3]; // разделитель в fromFormat
  const toFormatSeparator = toFormat[3]; // разделитель в toFormat
  const dateArr = date.split(fromFormatSeparator); // массив из чисел даты
  const fromFormatObj = {};
  const toFormatObj = {};

  for (let i = 0; i < 3; i++) {
    fromFormatObj[fromFormat[i]] = dateArr[i];
  }

  for (let i = 0; i < 3; i++) {
    toFormatObj[toFormat[i]] = fromFormatObj[toFormat[i]];
  }

  if (toFormatObj.hasOwnProperty('YYYY')) {
    if (fromFormatObj.hasOwnProperty('YYYY')) {
      toFormatObj.YYYY = fromFormatObj.YYYY;
    } else {
      toFormatObj.YYYY = fromFormatObj.YY < 30
        ? `20${fromFormatObj.YY}`
        : `19${fromFormatObj.YY}`;
    }
  } else {
    toFormatObj.YY = fromFormatObj.YY
      ? fromFormatObj.YY
      : `${fromFormatObj.YYYY[2]}${fromFormatObj.YYYY[3]}`;
  }

  return Object.values(toFormatObj).join(toFormatSeparator);
}

module.exports = formatDate;
