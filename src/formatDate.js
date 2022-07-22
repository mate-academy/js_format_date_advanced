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
  const newDate = new Array(3);
  const oldSpliter = fromFormat[3];
  const newSpliter = toFormat[3];
  let year, month, day;

  const oldDate = date.split(oldSpliter);

  // looking for month, day in old format and setting the date variables
  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'DD': day = oldDate[i];
        break;
      case 'MM': month = oldDate[i];
        break;
      case 'YYYY':
      case 'YY': year = oldDate[i];
        break;
      default:
        break;
    }
  }

  // looking for month, day and year in new format and put them all
  // to newDate in right order with transformation YY to YYYY or YYYY to YY
  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD': newDate[i] = day;
        break;
      case 'MM': newDate[i] = month;
        break;
      case 'YYYY':
        if (year.length !== 2) {
          newDate[i] = year;
          break;
        }

        newDate[i] = (year >= 30 && year.length === 2)
          ? '19' + year
          : '20' + year;
        break;
      case 'YY':
        newDate[i] = (year.length === 4)
          ? newDate[i] = year.slice(-2)
          : newDate[i] = year;
        break;
      default:
        break;
    }
  }

  return newDate.join(newSpliter);
}

module.exports = formatDate;
