'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` outputDateay and the new `toFormat` outputDateay.
 * Function returnsgiven date in new format.
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
  const format = {};
  const outputDate = [];
  const dateTooutputDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      format.day = dateTooutputDate[i];
    }

    if (fromFormat[i] === 'MM') {
      format.month = dateTooutputDate[i];
    }

    if (fromFormat[i] === 'YY') {
      format.year = dateTooutputDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      format.year = dateTooutputDate[i].slice(-2);
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      outputDate.push(format.day);
    }

    if (toFormat[i] === 'MM') {
      outputDate.push(format.month);
    }

    if (toFormat[i] === 'YY') {
      outputDate.push(format.year);
    }

    if (toFormat[i] === 'YYYY') {
      if (format.year < 30) {
        format.year = '20' + format.year;
      } else {
        format.year = '19' + format.year;
      }

      outputDate.push(format.year);
    }
  }

  return outputDate.join(toFormat[3]);
}

module.exports = formatDate;
