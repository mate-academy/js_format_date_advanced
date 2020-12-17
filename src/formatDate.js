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
  let separator = fromFormat[3];

  const dateArr = date.split(separator);
  const dates = {};
  const result = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      dates.year = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      dates.month = dateArr[i];
    }

    if (fromFormat[i] === 'DD') {
      dates.day = dateArr[i];
    }

    if (fromFormat[i] === 'YYYY') {
      dates.year = dateArr[i];
    }
  }

  separator = toFormat[3];

  for (let j = 0; j < toFormat.length - 1; j++) {
    if (toFormat[j] === 'YY' || toFormat[j] === 'YYYY') {
      if (toFormat[j].length > 2 && dates.year.length !== 4) {
        if (dates.year < 30) {
          result.push(20 + dates.year);
        } else {
          result.push(19 + dates.year);
        }
      } else if (toFormat[j].length < 4) {
        result.push(dates.year.slice(2));
      } else {
        result.push(dates.year);
      }
    }

    if (toFormat[j] === 'MM') {
      result.push(dates.month);
    }

    if (toFormat[j] === 'DD') {
      result.push(dates.day);
    }
  }

  return result.join(separator);
}

module.exports = formatDate;
