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
  const dateParts = {
    separator: fromFormat[fromFormat.length - 1],
  };

  const separateDate = date.split(dateParts.separator);

  for (const partFrom of fromFormat) {
    switch (partFrom) {
      case 'YY':
        dateParts.year = separateDate[fromFormat.indexOf(partFrom)];
        break;

      case 'YYYY':
        dateParts.year = separateDate[fromFormat.indexOf(partFrom)];
        break;

      case 'MM':
        dateParts.month = separateDate[fromFormat.indexOf(partFrom)];
        break;

      case 'DD':
        dateParts.day = separateDate[fromFormat.indexOf(partFrom)];
        break;
    }
  }

  for (const partTo of toFormat) {
    switch (partTo) {
      case 'YY':
        if (partTo.length === dateParts.year.length) {
          toFormat[toFormat.indexOf(partTo)] = dateParts.year;
          break;
        } else {
          toFormat[toFormat.indexOf(partTo)]
          = dateParts.year.slice(2, dateParts.year.length);
          break;
        }

      case 'YYYY':
        if (partTo.length === dateParts.year.length) {
          toFormat[toFormat.indexOf(partTo)] = dateParts.year;
          break;
        } else {
          toFormat[toFormat.indexOf(partTo)] = (parseInt(dateParts.year) >= 30)
            ? '19' + dateParts.year
            : '20' + dateParts.year;
          break;
        }

      case 'MM':
        toFormat[toFormat.indexOf(partTo)] = dateParts.month;
        break;

      case 'DD':
        toFormat[toFormat.indexOf(partTo)] = dateParts.day;
        break;
    }
  }

  return toFormat.join(toFormat.pop());
}

module.exports = formatDate;
