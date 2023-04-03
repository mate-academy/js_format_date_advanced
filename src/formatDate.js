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
  // write code here
  const data = {
    day: 0,
    month: 0,
    year: 0,
    separator: toFormat[toFormat.length - 1],
  };

  const oldSeparator = fromFormat[fromFormat.length - 1];
  let oldYearFormat = '';
  const currentDate = date.split(oldSeparator);
  const returnedValue = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      data.day = currentDate[i];
    }

    if (fromFormat[i] === 'MM') {
      data.month = currentDate[i];
    }

    if (fromFormat[i].includes('YY')) {
      data.year = currentDate[i];
      oldYearFormat = fromFormat[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      returnedValue[i] = data.day;
    } else if (toFormat[i] === 'MM') {
      returnedValue[i] = data.month;
    } else if (toFormat[i] === oldYearFormat) {
      returnedValue[i] = data.year;
    } else if (toFormat[i] === 'YY' && oldYearFormat === 'YYYY') {
      returnedValue[i] = data.year.slice(-2);
    } else {
      returnedValue[i] = data.year >= 30 ? `19${data.year}` : `20${data.year}`;
    }
  }

  return returnedValue.join(data.separator);
}

module.exports = formatDate;
