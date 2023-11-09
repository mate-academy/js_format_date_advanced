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
  const dateInput = date;
  const oldFormat = fromFormat;
  const newFormat = toFormat;
  const oldDelimiter = oldFormat.splice(3, 1);
  const newDelimiter = newFormat.splice(3, 1);

  const dateArray = dateInput.split(oldDelimiter);
  const dateObj = {};
  let resultDate = '';
  const resultDateArray = [];

  for (let i = 0; i <= oldFormat.length; i++) {
    dateObj[oldFormat[i]] = dateArray[i];
  }

  if (newFormat.includes('YYYY') && (oldFormat.includes('YY'))) {
    dateObj.YYYY = (dateObj.YY > 29 ? '19' : '20') + dateObj.YY;
    delete dateObj.YY;
  }

  if (newFormat.includes('YY') && (oldFormat.includes('YYYY'))) {
    dateObj.YY = dateObj.YYYY.slice(2);
    delete dateObj.YYYY;
  }

  for (let i = 0; i <= newFormat.length; i++) {
    resultDateArray[i] = dateObj[newFormat[i]];
  }

  resultDate = resultDateArray.join(newDelimiter);

  return resultDate.slice(0, resultDate.length - 1);
}

module.exports = formatDate;
