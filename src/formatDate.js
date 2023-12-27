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
  const splittedDate = date.split(fromFormat.pop());
  const fromDateFormat = [];
  const toDateFormat = [];

  for (let i = 0; i < splittedDate.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        fromDateFormat[0] = splittedDate[i];
        break;
      case 'MM':
        fromDateFormat[1] = splittedDate[i] - 1;
        break;
      case 'DD':
        fromDateFormat[2] = splittedDate[i];
        break;
    }
  }

  const dateObj = new Date(...fromDateFormat);

  for (let i = 0; i < fromDateFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        toDateFormat.push(dateObj.getFullYear().toString().slice(-2));
        break;
      case 'YYYY':
        if (fromFormat.includes('YY')) {
          const year = fromDateFormat[0];

          toDateFormat.push(year < 30 ? '20' + year : '19' + year);
        } else {
          toDateFormat.push(dateObj.getFullYear());
        }
        break;
      case 'MM':
        const month = dateObj.getMonth() + 1;

        if (month < 10) {
          toDateFormat.push(`0${month}`);
        } else {
          toDateFormat.push(month);
        }
        break;
      case 'DD':
        toDateFormat.push(dateObj.getDate());
        break;
    }
  }

  return toDateFormat.join(toFormat.pop());
}

module.exports = formatDate;
