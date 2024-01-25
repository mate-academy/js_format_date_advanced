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
  const correctDate = [];
  const separator = toFormat[fromFormat.length - 1];
  const splitedDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < 3; i++) {
    const indexFromFormat = fromFormat.indexOf(toFormat[i]);
    let neededFormatPart;

    if (indexFromFormat !== -1) {
      neededFormatPart = splitedDate[indexFromFormat];
    } else {
      neededFormatPart = converYear(splitedDate, fromFormat, toFormat, i);
    }

    correctDate.push(neededFormatPart);
  }

  return correctDate.join(separator);
}

function converYear(date, fromFormat, toFormat, step) {
  const isYearFullFormat = toFormat[step].length === 4;
  let yearIndex;

  if (isYearFullFormat) {
    yearIndex = fromFormat.indexOf('YY');

    const year = date[yearIndex];

    if (+year >= 30) {
      return '19' + year;
    }

    return '20' + year;
  }

  yearIndex = fromFormat.indexOf('YYYY');

  return date[yearIndex].slice(2);
}

module.exports = formatDate;
