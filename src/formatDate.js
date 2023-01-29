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
 * @param {string[]} string
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const prevDate = date.split(fromFormat[3]);
  const nextDate = [];

  // check if year has double format
  const isDouble1 = fromFormat.includes('YY');
  const isDouble2 = toFormat.includes('YY');

  // get all indexes
  const indDay1 = fromFormat.indexOf('DD');
  const indMonth1 = fromFormat.indexOf('MM');
  const indYear1
  = isDouble1 ? fromFormat.indexOf('YY') : fromFormat.indexOf('YYYY');
  const indDay2 = toFormat.indexOf('DD');
  const indMonth2 = toFormat.indexOf('MM');
  const indYear2
  = isDouble2 ? toFormat.indexOf('YY') : toFormat.indexOf('YYYY');

  // day and month assignment
  nextDate[indDay2] = prevDate[indDay1];
  nextDate[indMonth2] = prevDate[indMonth1];

  // year assignment depending on its format
  const year = prevDate[indYear1];

  if (isDouble1 === isDouble2) {
    nextDate[indYear2] = year;

    return nextDate.join(toFormat[3]);
  }

  if (!isDouble1) {
    nextDate[indYear2] = year[2] + year[3];
  }

  if (!isDouble2) {
    nextDate[indYear2] = year < 30 ? '20' + year : '19' + year;
  }

  return nextDate.join(toFormat[3]);
}

module.exports = formatDate;
