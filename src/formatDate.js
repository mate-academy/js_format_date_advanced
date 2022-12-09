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
  const toMonthIndex = toFormat.indexOf('MM');
  const toDayIndex = toFormat.indexOf('DD');
  const fromMonthIndex = fromFormat.indexOf('MM');
  const fromDayIndex = fromFormat.indexOf('DD');
  let toYearIndex = 0;
  let fromYearIndex = 0;

  toYearIndex = toFormat.includes('YY')
    ? (toYearIndex = toFormat.indexOf('YY'))
    : (toYearIndex = toFormat.indexOf('YYYY'));

  fromYearIndex = fromFormat.includes('YY')
    ? (fromYearIndex = fromFormat.indexOf('YY'))
    : (fromYearIndex = fromFormat.indexOf('YYYY'));

  const newFormatArray = new Array(3);
  const dateArray = date.split(fromFormat[3]);
  const toYear = dateArray[fromYearIndex];

  newFormatArray[toDayIndex] = dateArray[fromDayIndex];
  newFormatArray[toMonthIndex] = dateArray[fromMonthIndex];
  newFormatArray[toYearIndex] = dateArray[fromYearIndex];

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    newFormatArray[toYearIndex] = toYear.slice(2);
  }

  if (toFormat.includes('YYYY')
  && fromFormat.includes('YY')
  && +toYear < 30) {
    newFormatArray[toYearIndex] = `20${toYear}`;
  }

  if (toFormat.includes('YYYY')
  && fromFormat.includes('YY')
  && +toYear >= 30) {
    newFormatArray[toYearIndex] = `19${toYear}`;
  }

  return newFormatArray.join(toFormat[3]);
}

module.exports = formatDate;
