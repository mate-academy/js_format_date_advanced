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
  const dateArray = date.split(fromFormat[3]);

  const dayPositionOld = fromFormat.indexOf('DD');
  const monthPositionOld = fromFormat.indexOf('MM');
  const yearPositionOld = 3 - dayPositionOld - monthPositionOld;

  const day = dateArray[dayPositionOld];
  const month = dateArray[monthPositionOld];
  let year = dateArray[yearPositionOld];

  const dayPositionNew = toFormat.indexOf('DD');
  const monthPositionNew = toFormat.indexOf('MM');
  const yearPositionNew = 3 - dayPositionNew - monthPositionNew;

  if (toFormat[yearPositionNew] > fromFormat[yearPositionOld]) {
    if (year < 30) {
      year = 20 + year;
    } else {
      year = 19 + year;
    }
  }

  if (toFormat[yearPositionNew] < fromFormat[yearPositionOld]) {
    year = year[2] + year[3];
  }

  const newDateArray = [];

  newDateArray[dayPositionNew] = day;
  newDateArray[monthPositionNew] = month;
  newDateArray[yearPositionNew] = year;

  const newDate = newDateArray.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
