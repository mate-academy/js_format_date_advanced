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
  const newArr = date.split(fromFormat[3]);
  const resultDate = [];
  let dateValue = 0;
  let monthValue = 0;
  let yearValue = 0;

  for (let index = 0; index < fromFormat.length; index++) {
    if (fromFormat[index] === 'YYYY' || fromFormat[index] === 'YY') {
      yearValue = newArr[index];
    }

    if (fromFormat[index] === 'MM') {
      monthValue = newArr[index];
    }

    if (fromFormat[index] === 'DD') {
      dateValue = newArr[index];
    }
  }

  for (const element of toFormat) {
    if (element === 'YYYY' || element === 'YY') {
      if (element.length === 2) {
        if (yearValue.length === 2) {
          resultDate.push(yearValue);
        } else if (yearValue.length === 4) {
          resultDate.push(`${yearValue[2]}${yearValue[3]}`);
        }
      } else if (element.length === 4) {
        if (yearValue.length === 4) {
          resultDate.push(yearValue);
        } else if (yearValue.length === 2) {
          resultDate.push(`${yearValue > 23 ? 19 : 20}${yearValue}`);
        }
      }
    }

    if (element === 'MM') {
      resultDate.push(monthValue);
    }

    if (element === 'DD') {
      resultDate.push(dateValue);
    }
  }

  return resultDate.join(toFormat[3]);
}

module.exports = formatDate;
