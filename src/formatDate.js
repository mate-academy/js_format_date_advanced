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

// formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.'])

function formatDate(date, fromFormat, toFormat) {
  const prevDate = date.split(fromFormat[3]);
  const prevDay = fromFormat.indexOf('DD');
  const prevMonth = fromFormat.indexOf('MM');
  let prevYear = fromFormat.indexOf('YY');
  const newDay = toFormat.indexOf('DD');
  const newMonth = toFormat.indexOf('MM');
  let newYear = toFormat.indexOf('YY');
  const newDate = [];

  if (prevYear === -1) {
    prevYear = fromFormat.indexOf('YYYY');
  }

  if (newYear === -1) {
    newYear = toFormat.indexOf('YYYY');
  }

  newDate[newDay] = prevDate[prevDay];
  newDate[newMonth] = prevDate[prevMonth];
  newDate[newYear] = prevDate[prevYear];

  if (fromFormat[prevYear].length > toFormat[newYear].length) {
    newDate[newYear] = prevDate[prevYear].substring(2);
  }

  if (fromFormat[prevYear].length < toFormat[newYear].length) {
    if (prevDate[prevYear][0] < 3) {
      newDate[newYear] = '20' + newDate[newYear];
    } else {
      newDate[newYear] = '19' + newDate[newYear];
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
