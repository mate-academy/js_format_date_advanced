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
  let newDate = '';
  const temporaryDate = date.split(fromFormat[3]);
  const dateObject = {};

  if (fromFormat[0] === 'DD') {
    dateObject.day = temporaryDate[0];
  } else if (fromFormat[1] === 'DD') {
    dateObject.day = temporaryDate[1];
  } else {
    dateObject.day = temporaryDate[2];
  }

  if (fromFormat[1] === 'MM') {
    dateObject.month = temporaryDate[1];
  } else {
    dateObject.month = temporaryDate[0];
  }

  if (toFormat.join().length > fromFormat.join().length) {
    if (fromFormat[0].includes('Y')) {
      dateObject.year = (temporaryDate[0] >= 30)
        ? '19' + temporaryDate[0]
        : '20' + temporaryDate[0];
    } else {
      dateObject.year = (temporaryDate[2] >= 30)
        ? ('19' + temporaryDate[2])
        : ('20' + temporaryDate[2]);
    }
  }

  if (toFormat.join().length === fromFormat.join().length) {
    dateObject.year = (fromFormat[0].includes('Y'))
      ? temporaryDate[0]
      : temporaryDate[2];
  }

  if (toFormat.join().length < fromFormat.join().length) {
    dateObject.year = (fromFormat[0].includes('Y'))
      ? date.slice(2, 4)
      : date.slice(8, 10);
  }

  if (toFormat[0].includes('D')) {
    newDate = dateObject.day + toFormat[3] + dateObject.month
      + toFormat[3] + dateObject.year;
  }

  if (toFormat[0].includes('M')) {
    newDate = dateObject.month + toFormat[3] + dateObject.day
      + toFormat[3] + dateObject.year;
  }

  if (toFormat[0].includes('Y')) {
    newDate = dateObject.year + toFormat[3] + dateObject.month
      + toFormat[3] + dateObject.day;
  }

  return newDate;
}

module.exports = formatDate;
