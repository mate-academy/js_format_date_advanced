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
  let day = '';
  let month = '';
  let year = '';
  let formatYear = '';
  const separatorBefore = fromFormat[3];
  const separatorAfter = toFormat[3];
  const fromFormatDate = {};
  const toFormatDate = {};
  const arr = date.split(`${separatorBefore}`);

  for (let i = 0; i < arr.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year += arr[i];
        break;
      case 'YY':
        year += arr[i];
        break;
      case 'MM':
        month += arr[i];
        break;
      case 'DD':
        day += arr[i];
        break;
    }

    fromFormatDate[formatDate[i]] = arr[i];
  }

  if (year.length === 2) {
    if (year < 30) {
      formatYear = `20${year}`;
    } else {
      formatYear = `19${year}`;
    }
  }

  for (const key of toFormat) {
    switch (key) {
      case 'DD':
        toFormatDate['DD'] = day;
        break;
      case 'MM':
        toFormatDate['MM'] = month;
        break;
      case 'YY':
        toFormatDate['YY'] = year.length === 4 ? year.slice(2, 4) : year;
        break;
      case 'YYYY':
        toFormatDate['YYYY'] = year.length === 2 ? formatYear : year;
        break;
    }
  }

  return Object.values(toFormatDate).join(`${separatorAfter}`);
}

module.exports = formatDate;
