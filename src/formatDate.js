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
  let yearLengthNew;

  for (const chars of toFormat) {
    if (chars.includes('Y')) {
      yearLengthNew = chars.length;
    }
  }

  const orderNew = toFormat[0].includes('Y') ? 1 : 0;
  const orderOld = fromFormat[0].includes('Y') ? 1 : 0;

  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];

  let year;
  let month;
  let days;

  const dateArray = date.split(separatorOld);

  if (orderOld === 1) {
    year = dateArray[0];
    month = dateArray[1];
    days = dateArray[2];
  }

  if (orderOld === 0) {
    year = dateArray[2];
    month = dateArray[1];
    days = dateArray[0];
  }

  const century = year.slice(0, 3) < 30 ? 20 : 19;

  if (year.length > yearLengthNew) {
    year = year.slice(2);
  }

  if (year.length < yearLengthNew) {
    year = century + year;
  }

  if (orderNew === 1) {
    return year + separatorNew + month + separatorNew + days;
  } else {
    return days + separatorNew + month + separatorNew + year;
  }
}

module.exports = formatDate;
