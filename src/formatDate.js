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
  const arrDate = date.split(fromFormat[3]);
  const dateParts = {};
  const arrModifiedDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        dateParts.day = arrDate[i];
        break;

      case 'MM':
        dateParts.month = arrDate[i];
        break;

      case 'YY':
        dateParts.year = arrDate[i];
        break;

      case 'YYYY':
        dateParts.year = arrDate[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      arrModifiedDate[i] = dateParts.day;
    }

    if (toFormat[i] === 'MM') {
      arrModifiedDate[i] = dateParts.month;
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      if (toFormat[i].length === dateParts.year.length) {
        arrModifiedDate[i] = dateParts.year;
      }

      if (toFormat[i].length > dateParts.year.length) {
        if (dateParts.year < 30) {
          arrModifiedDate[i] = '20' + dateParts.year;
        }

        if (dateParts.year >= 30) {
          arrModifiedDate[i] = '19' + dateParts.year;
        }
      }

      if (toFormat[i].length < dateParts.year.length) {
        arrModifiedDate[i] = dateParts.year.slice(2);
      }
    }
  }

  return arrModifiedDate.join(toFormat[3]);
}

module.exports = formatDate;
