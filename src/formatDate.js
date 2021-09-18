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
  const result = [];
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const splitDate = date.split(fromSeparator);
  const sliceFromFormat = fromFormat.slice(0, 3);
  const sliceToFormat = toFormat.slice(0, 3);

  for (let i = 0; i < sliceToFormat.length; i++) {
    if (sliceFromFormat[i].startsWith('Y')) {
      const fromYear = sliceFromFormat[i];
      const toYear = sliceToFormat.filter(word => word.startsWith('Y')) + '';
      const indexYear = sliceToFormat.indexOf(toYear);

      if (fromYear.length > toYear.length) {
        splitDate[i] = splitDate[i].slice(-2);
      } else if (fromYear.length < toYear.length) {
        if (+splitDate[i] >= 30) {
          splitDate[i] = '19' + splitDate[i];
        } else {
          splitDate[i] = '20' + splitDate[i];
        }
      }

      result[indexYear] = splitDate[i];
    }

    const index = toFormat.indexOf(fromFormat[i]);

    result[index] = splitDate[i];
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
