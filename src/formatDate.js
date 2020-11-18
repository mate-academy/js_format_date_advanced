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
  const answer = [];
  const dateArray = date.split(fromFormat[3]);
  let year, day, month;

  if (fromFormat[0].includes('M')) {
    month = dateArray[0];
  } else {
    month = dateArray[1];
  }

  if (fromFormat[0].includes('Y')) {
    year = dateArray[0];
  } else {
    year = dateArray[2];
  }

  if (fromFormat[0].includes('D')) {
    day = dateArray[0];
  } else {
    day = dateArray[1];
  }

  if (toFormat[0].includes('Y')) {
    switch (true) {
      case (year.length < toFormat[0].length && parseInt(year, 10) < 30): {
        answer[0] = '20' + year;
        break;
      }

      case (year.length < toFormat[0].length && parseInt(year, 10) >= 30): {
        answer[0] = '19' + year;
        break;
      }

      case (year.length > toFormat[0].length): {
        answer[0] = year.slice(2);
        break;
      }

      default : {
        answer[0] = year;
      }
    }
  } else {
    switch (true) {
      case (year.length < toFormat[2].length && parseInt(year, 10) < 30): {
        answer[2] = '20' + year;
        break;
      }

      case (year.length < toFormat[2].length && parseInt(year, 10) >= 30): {
        answer[2] = '19' + year;
        break;
      }

      case (year.length > toFormat[2].length): {
        answer[2] = year.slice(2);
        break;
      }

      default : {
        answer[2] = year;
      }
    }
  }

  if (toFormat[0].includes('D')) {
    answer[0] = day;
  } else if (toFormat[1].includes('D')) {
    answer[1] = day;
  } else {
    answer[2] = day;
  }

  if (toFormat[0].includes('M')) {
    answer[0] = month;
  } else {
    answer[1] = month;
  }

  return answer.join(toFormat[3]);
}
module.exports = formatDate;
