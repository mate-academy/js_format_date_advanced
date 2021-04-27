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
  const days = fromFormat.indexOf('DD');
  const month = fromFormat.indexOf('MM');
  const yearShort = fromFormat.indexOf('YY');
  const yearLong = fromFormat.indexOf('YYYY');

  const daysNew = toFormat.indexOf('DD');
  const monthNew = toFormat.indexOf('MM');
  const yearShortNew = toFormat.indexOf('YY');
  const yearLongNew = toFormat.indexOf('YYYY');

  let result = '';
  const sсheme = [];

  // find date array

  const dateArray = date.split(fromFormat[3]);

  // make new date format

  sсheme[daysNew] = dateArray[days];
  sсheme[monthNew] = dateArray[month];

  if (yearShort === -1) {
    if (yearShortNew === -1) {
      sсheme[yearLongNew] = dateArray[yearLong];
    } else {
      sсheme[yearShortNew]
      = (dateArray[yearLong] / 100).toString().split('.')[1];
      // 1234 --> 12.34 --> ( [12, 34][1] )
    }
  }

  if (yearLong === -1) {
    if (yearLongNew === -1) {
      sсheme[yearShortNew] = dateArray[yearShort];
    } else {
      if (+dateArray[yearShort] < 30) { // '20/02/18'  2020
        sсheme[yearLongNew] = +('20' + dateArray[yearShort]);
      }

      if (dateArray[yearShort] === '00') {
        sсheme[yearLongNew] = +('20' + dateArray[yearShort]);
      }

      if (dateArray[yearShort] >= '30') { // '30.02.18'  1930
        sсheme[yearLongNew] = +('19' + dateArray[yearShort]);
      }
    }
  }

  result = sсheme.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
