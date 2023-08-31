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
  let result = [];
  const fourYears = 'YYYY';
  const twoYears = 'YY';
  const days = 'DD';
  const months = 'MM';
  const partsDate = date.split(fromFormat[fromFormat.length - 1]);

  const info = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case twoYears:
      case fourYears:
        info.year = partsDate[i];
        break;
      case months:
        info.month = partsDate[i];
        break;
      case days:
        info.day = partsDate[i];
        break;
    }
  }

  let currentYear;

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === fourYears && info.year.length === 4) {
      result.push(info.year);
    } else if (toFormat[i] === fourYears && info.year.length === 2) {
      if (info.year < 30) {
        currentYear = 20;
      } else {
        currentYear = 19;
      }

      result.push(currentYear + info.year);
    } else if (toFormat[i] === days) {
      result.push(info.day);
    } else if (toFormat[i] === months) {
      result.push(info.month);
    } else if (toFormat[i] === twoYears) {
      result.push(info.year.slice(-2));
    }

    if (i < toFormat.length - 1) {
      result.push(toFormat[toFormat.length - 1]);
    }
  }

  result = result.join('');

  if (result[-1] === result[-2]) {
    result = result.slice(0, -1);
  }

  return result;
}

module.exports = formatDate;
