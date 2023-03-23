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
  const initialDate = date.split(fromFormat[fromFormat.length - 1]);
  const initialFormat = fromFormat.slice(0, 3);

  const requiredFormat = toFormat.slice(0, 3);
  const joiner = toFormat[toFormat.length - 1];

  const formatedDate = [];

  let day;
  let month;
  let year;

  for (let i = 0; i < initialFormat.length; i++) {
    if (initialFormat[i] === 'DD') {
      day = initialDate[i];
    }

    if (initialFormat[i] === 'MM') {
      month = initialDate[i];
    }

    if (initialFormat[i] === 'YY' || initialFormat[i] === 'YYYY') {
      year = initialDate[i];
    }
  }

  if (year.length < 4) {
    year = Number(year) < 30 ? `20${year}` : `19${year}`;
  }

  for (let i = 0; i < requiredFormat.length; i++) {
    if (requiredFormat[i] === 'DD') {
      formatedDate.push(day);
    }

    if (requiredFormat[i] === 'MM') {
      formatedDate.push(month);
    }

    if (requiredFormat[i] === 'YYYY') {
      formatedDate.push(year);
    }

    if (requiredFormat[i] === 'YY') {
      formatedDate.push(year.slice(-2));
    }
  }

  return formatedDate.join(joiner).toString();
}

module.exports = formatDate;
