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
  const splitter = fromFormat[3];
  const splitterTo = toFormat[3];
  const dateArray = date.split(splitter);
  const toFormatDate = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i <= 2; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateArray[i];
        break;

      case 'MM':
        month = dateArray[i];
        break;

      case 'YY':
      case 'YYYY':
        year = dateArray[i];
        break;
    }
  }

  for (let i = 0; i <= 2; i++) {
    switch (toFormat[i]) {
      case 'DD':
        toFormatDate.push(day);
        break;

      case 'MM':
        toFormatDate.push(month);
        break;

      case 'YY':
        toFormatDate.push(year.slice(-2));
        break;

      case 'YYYY':
        if (year.length < 4 && Number(year.slice(-2)) < 30) {
          year = '20' + year;
        } else if (year.length < 4) {
          year = '19' + year;
        }

        toFormatDate.push(year);
        break;
    }
  }

  const formatedDate = toFormatDate.join(splitterTo);

  return formatedDate;
}

module.exports = formatDate;
