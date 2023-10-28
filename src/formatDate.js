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
 *s
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
  const splittedDate = date.split(fromFormat[3]);
  const fromFormatObj = {
    [fromFormat[0]]: splittedDate[0],
    [fromFormat[1]]: splittedDate[1],
    [fromFormat[2]]: splittedDate[2],
  };

  const toFormatObj = {
    [toFormat[0]]: '',
    [toFormat[1]]: '',
    [toFormat[2]]: '',
  };

  for (const key of Object.keys(toFormatObj)) {
    if (fromFormat.includes(key)) {
      toFormatObj[key] = fromFormatObj[key];
    } else {
      if ((key === 'YYYY')) {
        if (fromFormatObj['YY'] < 30) {
          toFormatObj[key] = 20 + fromFormatObj['YY'];
        } else {
          toFormatObj[key] = 19 + fromFormatObj['YY'];
        }
      }

      if ((key === 'YY')) {
        toFormatObj[key] = (fromFormatObj['YYYY'].slice(2));
      }
    }
  }

  return Object.values(toFormatObj).join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
