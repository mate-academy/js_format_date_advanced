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
  const fromDelimiter = fromFormat[fromFormat.length - 1];
  const toDelimiter = toFormat[toFormat.length - 1];
  const fromDateArr = date.split(fromDelimiter);

  const fromYearIndex = fromFormat.findIndex(part => part === 'YYYY'
    || part === 'YY');
  const fromMonthIndex = fromFormat.findIndex(part => part === 'MM');
  const fromDayIndex = fromFormat.findIndex(part => part === 'DD');

  const toYearIndex = toFormat.findIndex(part => part === 'YYYY'
    || part === 'YY');
  const toMonthIndex = toFormat.findIndex(part => part === 'MM');
  const toDayIndex = toFormat.findIndex(part => part === 'DD');

  const toDateArr = [];

  let toYear = fromDateArr[fromYearIndex];

  if (toFormat[toYearIndex] === 'YY' && fromFormat[fromYearIndex] === 'YYYY') {
    toYear = fromDateArr[fromYearIndex].slice(-2);
  }

  if (toFormat[toYearIndex] === 'YYYY' && fromFormat[fromYearIndex] === 'YY') {
    if (+fromDateArr[fromYearIndex] > 29) {
      toYear = `19${fromDateArr[fromYearIndex]}`;
    } else {
      toYear = `20${fromDateArr[fromYearIndex]}`;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (i) {
      case toYearIndex:
        toDateArr.push(toYear);
        break;
      case toMonthIndex:
        toDateArr.push(fromDateArr[fromMonthIndex]);
        break;
      case toDayIndex:
        toDateArr.push(fromDateArr[fromDayIndex]);
        break;
    }
  }

  const toDate = toDateArr.join(toDelimiter);

  return toDate;
}

module.exports = formatDate;
