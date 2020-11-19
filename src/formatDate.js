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
  const formatedDate = [];
  const seperator = fromFormat.pop();
  const newSeperator = toFormat.pop();
  const dateInput = date.split(seperator);
  let day = null;
  let month = null;
  let year = null;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateInput[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateInput[i];
    }

    if (fromFormat[i] === 'YYYY') {
      year = dateInput[i];
    }

    if (fromFormat[i] === 'YY') {
      if (dateInput[i] > 20 && dateInput[i] < 99) {
        year = '19' + dateInput[i];
      } else {
        year = '20' + dateInput[i];
      }
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      formatedDate.push(day);
    }

    if (toFormat[i] === 'MM') {
      formatedDate.push(month);
    }

    if (toFormat[i] === 'YYYY') {
      formatedDate.push(year);
    }

    if (toFormat[i] === 'YY') {
      formatedDate.push(year.substr(2, 4));
    }
  }

  return formatedDate.join(newSeperator);
}

module.exports = formatDate;
