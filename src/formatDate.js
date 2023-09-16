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
  let dateSeparator = '/';
  const SEPARATOR_INDEX = 3;

  if (date.includes('-')) {
    dateSeparator = '-';
  } else if (date.includes('.')) {
    dateSeparator = '.';
  }

  const dateArray = date.split(dateSeparator);
  const dateObject = {};
  const result = [];

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObject.YY < 30) {
      dateObject.YYYY = '20' + dateObject.YY;
    } else {
      dateObject.YYYY = '19' + dateObject.YY;
    }
    delete dateObject.YY;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject.YY = dateObject.YYYY.slice(-2);
    delete dateObject.YYYY;
  }

  for (let i = 0; i < SEPARATOR_INDEX; i++) {
    for (const dateKey in dateObject) {
      if (toFormat[i] === dateKey) {
        result.push(dateObject[dateKey]);
      }
    }
  }

  return result.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
