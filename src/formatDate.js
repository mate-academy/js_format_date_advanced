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
  const dateObject = new Date(date);
  const dte = Number(dateObject.getDate());
  let month = Number(dateObject.getMonth() + 1);
  let year = Number(dateObject.getFullYear());
  let returnDate = '';
  const twoDigitsYear = year.toString().slice(-2);

  if (twoDigitsYear < 30) {
    year = twoDigitsYear.padStart(4, '20');
  } else {
    year = Number(twoDigitsYear.padStart(4, '19'));
  }

  if (month < 10) {
    month = `0${month}`;
  }

  if (fromFormat[0] === 'YYYY'
    && toFormat[0] === 'YYYY') {
    returnDate = `${year}.`;

    return returnDate;
  }

  if (fromFormat[0] === 'YYYY'
    && toFormat[0] === 'DD') {
    returnDate = `.${year}`;

    return returnDate;
  }

  if (fromFormat[0] === 'DD'
    && toFormat[0] === 'DD') {
    year = twoDigitsYear;
    returnDate = `${dte}/${month}/${year}`;

    return returnDate;
  }

  if (fromFormat[0] === 'YY'
    && toFormat[0] === 'YYYY') {
    returnDate = `${year}.${month}.${date}`;

    return returnDate;
  }

  if (fromFormat[0] === 'YY'
    && toFormat[0] === 'DD') {
    returnDate = `${dte}.${month}.${year}`;

    return returnDate;
  }

  if (fromFormat[0] === 'MM'
  && toFormat[0] === 'DD') {
    returnDate = `${dte}.${month}.${year}`;

    return returnDate;
  }
}

module.exports = formatDate;
