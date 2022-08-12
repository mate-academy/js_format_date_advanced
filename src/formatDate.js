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
  const dataObj = {};
  const arrDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (true) {
      case fromFormat[i].includes('D'):
        dataObj.day = arrDate[i];
        break;

      case fromFormat[i].includes('M'):
        dataObj.month = arrDate[i];
        break;

      default:
        dataObj.year = arrDate[i];
    }
  }

  const newDate = [];
  const fromFormatYear = dataObj.year;

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (true) {
      case toFormat[i].includes('D'):
        newDate.push(dataObj.day);
        break;

      case toFormat[i].includes('M'):
        newDate.push(dataObj.month);
        break;

      default:
        const toFormatYear = toFormat[i];

        if (toFormatYear.length === fromFormatYear.length) {
          newDate.push(dataObj.year);
        } else if (toFormatYear.length < fromFormatYear.length) {
          newDate.push(dataObj.year.slice(2));
        } else {
          if (fromFormatYear >= 30) {
            newDate.push(`19${dataObj.year}`);
          } else {
            newDate.push(`20${dataObj.year}`);
          }
        }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
