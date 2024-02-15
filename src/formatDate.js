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
  const arrDate = date.split(fromFormat[3].toString());
  const resultArray = [];

  let year = 0;
  let month = 0;
  let day = 0;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      year = arrDate[i];
    } else if (fromFormat[i].includes('M')) {
      month = arrDate[i];
    } else if (fromFormat[i].includes('D')) {
      day = arrDate[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i] === 'YY') {
        if (year.toString().length === 2) {
          resultArray.push(year);
        } else {
          resultArray.push(year.toString().slice(2, 4));
        }
      } else {
        if (year.toString().length === 2) {
          if (year > 24) {
            resultArray.push('19' + year);
          } else {
            resultArray.push('20' + year);
          }
        } else {
          resultArray.push(year);
        }
      }
    }

    if (toFormat[i].includes('M')) {
      resultArray.push(month);
    }

    if (toFormat[i].includes('D')) {
      resultArray.push(day);
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
