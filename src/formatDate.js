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
  // function makes YY from YYYY and vice versa
  const switchYearFormat = (currentYear) => {
    if (currentYear.length === 2) {
      return (+currentYear < 30) ? '20' + currentYear : '19' + currentYear;
    }

    return currentYear.slice(2);
  };

  // creating object as storage and array with dates
  const dateObject = {};
  const dateItems = date.split(fromFormat[3]);

  // fill our object with date, month, year separately
  for (let i = 0; i < dateItems.length; i++) {
    dateObject[fromFormat[i]] = dateItems[i];
  }

  // adding another year format to our object
  if (dateObject['YY']) {
    dateObject['YYYY'] = switchYearFormat(dateObject['YY']);
  } else {
    dateObject['YY'] = switchYearFormat(dateObject['YYYY']);
  }

  // create resulting array
  const newDate = [];

  // fill our resulting array with dates in right order
  for (let i = 0; i < toFormat.length - 1; i++) {
    newDate.push(dateObject[toFormat[i]]);
  }

  // return joined string with separator from toFormat
  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
