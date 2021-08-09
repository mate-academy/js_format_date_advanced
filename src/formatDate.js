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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const oldDate = date.split(oldSeparator);
  const newFormatOfDate = [];
  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  let indexOfYear = fromFormat.indexOf('YY');

  if (indexOfYear === -1) {
    indexOfYear = fromFormat.indexOf('YYYY');
  }

  let year = oldDate[indexOfYear].slice(-2);
  const month = oldDate[indexOfMonth];
  const day = oldDate[indexOfDay];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        newFormatOfDate[i] = year;
        break;

      case 'YYYY':
        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }

        newFormatOfDate[i] = year;
        break;

      case 'MM':
        newFormatOfDate[i] = month;
        break;

      case 'DD':
        newFormatOfDate[i] = day;
        break;
    }
  }

  return newFormatOfDate.join(newSeparator);
}

module.exports = formatDate;
