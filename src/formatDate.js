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
  const [,,, oldSeparator] = fromFormat;
  const [,,, newSeparator] = toFormat;
  const newDateArr = new Array(3);
  let year = 0;
  let month = 0;
  let day = 0;

  const oldDateArr = date.split(oldSeparator);

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YY': {
        year = oldDateArr[i];
        break;
      }

      case 'YYYY': {
        year = oldDateArr[i];
        break;
      }

      case 'MM': {
        month = oldDateArr[i];
        break;
      }

      default: {
        day = oldDateArr[i];
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YY': {
        if (year.length === 4) {
          year = year.slice(2);
        }
        newDateArr[i] = year;
        break;
      }

      case 'YYYY': {
        if (year.length === 2) {
          if (+year < 30) {
            year = '20' + year;
          } else {
            year = '19' + year;
          }
        }
        newDateArr[i] = year;
        break;
      }

      case 'MM': {
        newDateArr[i] = month;
        break;
      }

      default: {
        newDateArr[i] = day;
      }
    }
  }

  const newDate = newDateArr.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
