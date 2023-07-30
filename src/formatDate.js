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
  const partsOfDays = {
    day: '',
    month: '',
    year: '',
  };

  let { day, month, year } = partsOfDays;

  const separator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day += dateParts[i];
    }

    if (fromFormat[i] === 'MM') {
      month += dateParts[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year += dateParts[i];
    }
  }

  const newFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newFormat.push(day);
    }

    if (toFormat[i] === 'MM') {
      newFormat.push(month);
    }

    if (toFormat[i] === 'YY') {
      newFormat.push(year.slice(2));
    }

    if (toFormat[i] === 'YYYY' && fromFormat.includes('YYYY')) {
      newFormat.push(year);
    }

    if (toFormat[i] === 'YYYY' && fromFormat[i] === 'YY' && year < 30) {
      newFormat.push(`20${year}`);
    }

    if (toFormat[i] === 'YYYY' && fromFormat[i] === 'YY' && year >= 30) {
      newFormat.push(`19${year}`);
    }
  }

  return newFormat.join(separator);
}

module.exports = formatDate;
