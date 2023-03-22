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
  const dateFromFormat = date.split(fromFormat[3]);
  const dateToFormat = [];

  let dayIndex = 0;
  let monthIndex = 0;
  let yearIndex = 0;

  for (let j = 0; j < dateFromFormat.length; j++) {
    if (fromFormat[j] === 'DD') {
      dayIndex = j;
    }

    if (fromFormat[j] === 'MM') {
      monthIndex = j;
    }

    if (fromFormat[j] === 'YY' || fromFormat[j] === 'YYYY') {
      yearIndex = j;
    }
  }

  for (let i = 0; i < dateFromFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      dateToFormat.push(dateFromFormat[dayIndex]);
    }

    if (toFormat[i] === 'MM') {
      dateToFormat.push(dateFromFormat[monthIndex]);
    }

    if ((toFormat[i] === 'YYYY' || toFormat[i] === 'YY')
    && toFormat[i] === fromFormat[yearIndex]) {
      dateToFormat.push(dateFromFormat[yearIndex]);
    }

    if (fromFormat[yearIndex] === 'YY' && toFormat[i] === 'YYYY') {
      /* eslint-disable */
      (Number(dateFromFormat[yearIndex]) < 30)
        ? dateToFormat.push('20' + dateFromFormat[yearIndex])
        : dateToFormat.push('19' + dateFromFormat[yearIndex]);
    }

    if (fromFormat[yearIndex] === 'YYYY' && toFormat[i] === 'YY') {
      dateToFormat.push(dateFromFormat[yearIndex].slice(2));
    }
  }

  return dateToFormat.join(toFormat[3]);
}

module.exports = formatDate;
