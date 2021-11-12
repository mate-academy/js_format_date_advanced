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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const dateParse = date.split(oldSeparator);
  const updatedDate = [];

  const oldDateFormat = fromFormat.slice(0, -1);
  const newDateFormat = toFormat.slice(0, -1);

  const dateMap = {};

  // write the date in the object in format d:0,m:00,y:0000;
  for (let i = 0; i < oldDateFormat.length; i++) {
    dateMap[oldDateFormat[i][0]] = dateParse[i];
  }

  // push dates to updatedDate array in the right order
  for (let i = 0; i < newDateFormat.length; i++) {
    if (dateMap[newDateFormat[i][0]]) {
      updatedDate.push(dateMap[newDateFormat[i][0]]);
    }

    // find and handle the year part
    if (newDateFormat[i][0] === 'Y') {
      const newFormYear = newDateFormat[i];

      updatedDate[i] = handleYearFormat(newFormYear, updatedDate[i]);
    }
  }

  return updatedDate.join(newSeparator);
}

function handleYearFormat(newFormat, oldYear) {
  let year = '';

  if (newFormat.length === oldYear.length) {
    return oldYear;
  } else {
    if (newFormat.length < oldYear.length) {
      year = oldYear.slice(-2);
    }

    if (newFormat.length > oldYear.length) {
      year = oldYear < 30 ? '20' + oldYear : '19' + oldYear;
    }
  }

  return year;
};

module.exports = formatDate;
