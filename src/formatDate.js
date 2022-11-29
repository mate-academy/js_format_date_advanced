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
  return toDate(toFormat, separateDate(fromFormat, date));
}

module.exports = formatDate;

function separateDate(format, date) {
  const dateSeparated = date.split(format[3]);

  const dateGroup = {};

  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'YYYY') {
      dateGroup.year = dateSeparated[i];
    }

    if (format[i] === 'YY') {
      dateGroup.year = dateSeparated[i];
    }

    if (format[i] === 'DD') {
      dateGroup.day = dateSeparated[i];
    }

    if (format[i] === 'MM') {
      dateGroup.month = dateSeparated[i];
    }
  }

  return dateGroup;
}

function toDate(format, date) {
  const finalDate = [];

  for (let i = 0; i < format.length; i++) {
    if (format[i] === 'YYYY') {
      if (date.year.length === 4) {
        finalDate.push(date.year);
      }

      if (date.year.length === 2) {
        const year = date.year < 30 ? `20${date.year}` : `19${date.year}`;

        finalDate.push(year);
      }
    }

    if (format[i] === 'YY') {
      if (date.year.length === 4) {
        finalDate.push(date.year.slice(2));
      } else {
        finalDate.push(date.year);
      }
    }

    if (format[i] === 'DD') {
      finalDate.push(date.day);
    }

    if (format[i] === 'MM') {
      finalDate.push(date.month);
    }
  }

  return finalDate.join(format[3]);
}
