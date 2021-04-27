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
  // main declaration block
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  const y2 = 'YY';
  const y4 = 'YYYY';

  // 'Year' implementation block
  if (toFormat.includes(y4) && fromFormat.includes(y4)) {
    newDate[toFormat.indexOf(y4)] = oldDate[fromFormat.indexOf(y4)];
  }

  if (toFormat.includes(y2) && fromFormat.includes(y2)) {
    newDate[toFormat.indexOf(y2)] = oldDate[fromFormat.indexOf(y2)];
  }

  if (toFormat.includes(y4) && fromFormat.includes(y2)) {
    newDate[toFormat.indexOf(y4)] = (oldDate[fromFormat.indexOf(y2)] < 30)
      ? ('20' + oldDate[fromFormat.indexOf(y2)])
      : ('19' + oldDate[fromFormat.indexOf(y2)]);
  }

  if (toFormat.includes(y2) && fromFormat.includes(y4)) {
    newDate[toFormat.indexOf(y2)]
      = oldDate[fromFormat.indexOf(y4)].substring(2);
  }

  // 'Month' implementation block
  newDate[toFormat.indexOf('MM')] = oldDate[fromFormat.indexOf('MM')];

  // 'Day' implementation block
  newDate[toFormat.indexOf('DD')] = oldDate[fromFormat.indexOf('DD')];

  // return block
  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
