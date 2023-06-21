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
  const resultDate = [];
  const separators = [fromFormat.pop(), toFormat.pop()];
  const arrOfDateParts = date.split(`${separators[0]}`);

  fromFormat.map((part, ind) => {
    switch (part) {
      case 'DD':
        resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        break;

      case 'MM':
        resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        break;

      case 'YYYY':
        if (toFormat.indexOf(part) !== -1) {
          resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        } else {
          resultDate[toFormat.indexOf('YY')] = arrOfDateParts[ind].slice(2);
        }
        break;

      case 'YY':
        if (toFormat.indexOf(part) !== -1) {
          resultDate[toFormat.indexOf(part)] = arrOfDateParts[ind];
        } else {
          if (+arrOfDateParts[ind] < 30) {
            resultDate[toFormat.indexOf('YYYY')] = '20' + arrOfDateParts[ind];
          } else {
            resultDate[toFormat.indexOf('YYYY')] = '19' + arrOfDateParts[ind];
          }
        }
        break;

      default: break;
    };
  });

  return resultDate.join(`${separators[1]}`);
}

module.exports = formatDate;
