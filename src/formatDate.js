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
  let FORMAT_YEAR = '';
  let FORMAT_MONTH = '';
  let FORMAT_DAY = '';
  const dateFormatNew = [];

  const splitOldDate = fromFormat[fromFormat.length - 1];
  const splitNewDate = toFormat[toFormat.length - 1];

  const dateFormatOld = date.split(splitOldDate);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const elementArray = fromFormat[i];

    if (elementArray === 'YYYY') {
      FORMAT_YEAR = dateFormatOld[i];
    } else if (elementArray === 'YY') {
      FORMAT_YEAR = dateFormatOld[i];
    } else if (elementArray === 'MM') {
      FORMAT_MONTH = dateFormatOld[i];
    } else if (elementArray === 'DD') {
      FORMAT_DAY = dateFormatOld[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const elementArray = toFormat[i];

    if (elementArray === 'YYYY') {
      let changeFormatYear = FORMAT_YEAR;

      if (FORMAT_YEAR.length === 2) {
        changeFormatYear = FORMAT_YEAR < 30
          ? '20' + FORMAT_YEAR
          : '19' + FORMAT_YEAR;

        dateFormatNew.push(changeFormatYear);
      } else {
        dateFormatNew.push(changeFormatYear);
      }

      ;
    } else if (elementArray === 'YY') {
      const changeFormatYear = FORMAT_YEAR.split('').slice(2, 4).join('');

      dateFormatNew.push(changeFormatYear);
    } else if (elementArray === 'MM') {
      dateFormatNew.push(FORMAT_MONTH);
    } else if (elementArray === 'DD') {
      dateFormatNew.push(FORMAT_DAY);
    }
  }

  return dateFormatNew.join(splitNewDate);
}

module.exports = formatDate;
