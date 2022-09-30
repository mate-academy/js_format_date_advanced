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
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  const yearToFormat = [...toFormat].sort()[3];
  const dateOb = {};
  const arrDateFrom = date.split(separatorFrom);
  const arrDateTo = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        if (yearToFormat === 'YYYY') {
          dateOb.year = (+arrDateFrom[i].slice(-2) < 30)
            ? '20' + arrDateFrom[i]
            : '19' + arrDateFrom[i];
        } else {
          dateOb.year = arrDateFrom[i];
        }
        break;
      case 'YYYY':
        if (yearToFormat === 'YY') {
          dateOb.year = arrDateFrom[i].slice(2);
        } else {
          dateOb.year = arrDateFrom[i];
        }
        break;
      case 'MM':
        dateOb.month = arrDateFrom[i];
        break;
      case 'DD':
        dateOb.day = arrDateFrom[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        arrDateTo[i] = dateOb.year;
        break;
      case 'MM':
        arrDateTo[i] = dateOb.month;
        break;
      case 'DD':
        arrDateTo[i] = dateOb.day;
        break;
    }
  }

  return arrDateTo.join(separatorTo);
}

module.exports = formatDate;
