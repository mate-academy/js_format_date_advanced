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
  const initialDate = date.split(fromFormat[3]);
  const convertedDate = new Array(3);

  const initialDayIndex = fromFormat.indexOf('DD');
  const initialMonthIndex = fromFormat.indexOf('MM');
  const initialYearShort = fromFormat.indexOf('YY') !== -1;
  const initialYearIndex = Math.max(
    fromFormat.indexOf('YY'),
    fromFormat.indexOf('YYYY')
  );

  const convertedDayIndex = toFormat.indexOf('DD');
  const convertedMonthIndex = toFormat.indexOf('MM');
  const convertedYearShort = toFormat.indexOf('YY') !== -1;
  const convertedYearIndex = Math.max(
    toFormat.indexOf('YY'),
    toFormat.indexOf('YYYY')
  );

  convertedDate[convertedDayIndex] = initialDate[initialDayIndex];
  convertedDate[convertedMonthIndex] = initialDate[initialMonthIndex];

  if (initialYearShort && !convertedYearShort) {
    if (initialDate[initialYearIndex] < 30) {
      convertedDate[convertedYearIndex] = '20' + initialDate[initialYearIndex];
    } else {
      convertedDate[convertedYearIndex] = '19' + initialDate[initialYearIndex];
    }
  } else if (!initialYearShort && convertedYearShort) {
    convertedDate[convertedYearIndex] = initialDate[initialYearIndex].slice(2);
  } else {
    convertedDate[convertedYearIndex] = initialDate[initialYearIndex];
  }

  return convertedDate.join(toFormat[3]);
}

module.exports = formatDate;
