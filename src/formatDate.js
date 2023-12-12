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
  // write code here
  const NEW_DIVIDER = toFormat[3];

  const result = [];
  const dateCopy = date.split(fromFormat[3]);

  for (const datePart of toFormat) {
    let number = 0;
    let index = 0;

    switch (datePart) {
      case 'YY':
        index = fromFormat.indexOf('YY');

        if (index < 0) {
          index = fromFormat.indexOf('YYYY');
        }

        number = dateCopy[index];

        if (number > 99) {
          number = number % 100;
        }
        result.push(number);
        break;

      case 'YYYY':
        index = fromFormat.indexOf('YY');

        if (index < 0) {
          index = fromFormat.indexOf('YYYY');
        }

        number = dateCopy[index];

        if (number <= 99) {
          number = number >= 30 ? '19' + number : '20' + number;
        }
        result.push(number);
        break;

      case 'DD':
        index = fromFormat.indexOf('DD');
        number = dateCopy[index];
        result.push(number);
        break;

      case 'MM':
        index = fromFormat.indexOf('MM');
        number = dateCopy[index];
        result.push(number);
        break;

      default: break;
    }
  }

  return result.join(NEW_DIVIDER);
}

module.exports = formatDate;
