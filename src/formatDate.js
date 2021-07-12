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
  const arr = [];
  let result;
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);

  if (splittedDate[0].length !== toFormat[0].length
    && splittedDate[2].length !== toFormat[2].length) {
    splittedDate.reverse();
    result = splittedDate.join(toFormat[toFormat.length - 1]);

    return result;
  }

  const newDateFormat = {
    [fromFormat[0]]: splittedDate[0],
    [fromFormat[1]]: splittedDate[1],
    [fromFormat[2]]: splittedDate[2],
  };

  for (let i = 0; i < toFormat.length; i++) {
    for (const key in newDateFormat) {
      if (key === toFormat[i]) {
        arr.push(newDateFormat[key]);
        break;
      }

      if (toFormat[i].length === 4 && key.length === 2) {
        if (+newDateFormat[key] < 30) {
          arr.push('20' + newDateFormat[key]);
          break;
        } else {
          arr.push('19' + newDateFormat[key]);
          break;
        }
      }

      if (toFormat[i].length === 2
        && key.length === 4 && key.slice(2) === toFormat[i]) {
        arr.push(newDateFormat[key].slice(2));
        break;
      }
    }
  }

  return arr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
