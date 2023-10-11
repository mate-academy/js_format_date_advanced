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
  const oldDate = date.split(fromFormat[3]);
  let newDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < oldDate.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = oldDate[i];
    }

    if (fromFormat[i].includes('M')) {
      month = oldDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = oldDate[i];
    }
  }

  for (let i = 0; i < oldDate.length; i++) {
    if (toFormat[i].includes('Y')) {
      if (year.length === toFormat[i].length) {
        newDate[i] = year;
      }

      if (year.length > toFormat[i].length) {
        newDate[i] = year.slice(2);
      }

      if (year.length < toFormat[i].length) {
        if (year < 30) {
          newDate[i] = 20 + year;
        }

        if (year >= 30) {
          newDate[i] = 19 + year;
        }
      }
    }

    if (toFormat[i].includes('M')) {
      newDate[i] = month;
    }

    if (toFormat[i].includes('D')) {
      newDate[i] = day;
    }
  }

  newDate = newDate.join(toFormat[toFormat.length - 1]);

  return newDate;
}

module.exports = formatDate;
