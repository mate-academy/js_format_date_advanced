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
  const oldShortYearIndex = fromFormat.indexOf('YY');
  const oldFullYearIndex = fromFormat.indexOf('YYYY');
  const newShortYearIndex = toFormat.indexOf('YY');
  const newFullYearIndex = toFormat.indexOf('YYYY');

  const initialDateList = date.split(fromFormat[3]);
  const newDateList = [];

  const oldYearIndex = oldShortYearIndex === -1 ? oldFullYearIndex
    : oldShortYearIndex;

  const newYearIndex = newShortYearIndex === -1 ? newFullYearIndex
    : newShortYearIndex;

  const oldYearFormat = fromFormat[oldYearIndex];
  const oldYearValue = initialDateList[oldYearIndex];

  const newYearFormat = toFormat[newYearIndex];

  const newYearValue = transformYearFormat(oldYearValue,
    oldYearFormat, newYearFormat);

  newDateList[newYearIndex] = newYearValue;

  for (let i = 0; i < toFormat.length - 1; i++) {
    const index = toFormat.indexOf(fromFormat[i]);

    if (index !== -1) {
      newDateList[index] = initialDateList[i];
    }
  }

  return newDateList.join(toFormat[3]);
}

function transformYearFormat(oldValue, oldFormat, newFormat) {
  const newCenturyLimit = 30;
  let newValue = '';

  if (oldFormat === 'YYYY' && newFormat === 'YY') {
    newValue = oldValue.slice(2);
  } else if (oldFormat === 'YY' && newFormat === 'YYYY') {
    newValue = +oldValue < newCenturyLimit ? '20' + oldValue
      : '19' + oldValue;
  } else {
    newValue = oldValue;
  }

  return newValue;
}

module.exports = formatDate;
