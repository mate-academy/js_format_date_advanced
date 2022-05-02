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
  const newFormat = [];
  const dateObj = {};
  const fromSeperator = fromFormat.pop();
  const dateArray = date.split(fromSeperator);
  const toSeperator = toFormat.pop();
  // let year, month, day;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY') {
      if (+dateArray[i] < 30) {
        dateObj['YYYY'] = `20${dateArray[i]}`;
      } else {
        dateObj['YYYY'] = `19${dateArray[i]}`;
      }
    } else {
      dateObj[fromFormat[i]] = dateArray[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        newFormat[i] = dateObj['YYYY'].slice(2);
        break;

      case 'YYYY':
        newFormat[i] = dateObj['YYYY'];
        break;

      case 'MM':
        newFormat[i] = dateObj['MM'];
        break;

      case 'DD':
        newFormat[i] = dateObj['DD'];
        break;

      default:
        return 'Invalid Format!';
    }
  }

  return newFormat.join(toSeperator);
}

module.exports = formatDate;
