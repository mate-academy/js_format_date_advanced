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

const formatDay = 'DD';
const formatMonth = 'MM';
const formatYearFourChars = 'YYYY';
const formatYearTwoChars = 'YY';
const toTwentyFirstCentury = 2000;
const toTwentiethCentury = 1900;
const limitYearForCentury = 30;

function formatDate(date, fromFormat, toFormat) {
  const dayParts = date.split(fromFormat[fromFormat.length - 1]);

  let day = '';
  let month = '';
  let year = '';
  const divider = toFormat[toFormat.length - 1];

  for (let i = 0; i < dayParts.length; i++) {
    if (fromFormat[i] === formatDay) {
      day = dayParts[i];
    }

    if (fromFormat[i] === formatMonth) {
      month = dayParts[i];
    }

    if (fromFormat[i] === formatYearFourChars
      || fromFormat[i] === formatYearTwoChars) {
      year = dayParts[i];
    }
  }

  let formattedDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === formatYearFourChars) {
      if (year.length === 2) {
        let yearToNum = parseInt(year, 10);

        yearToNum = (yearToNum < limitYearForCentury)
          ? (yearToNum += toTwentyFirstCentury)
          : (yearToNum += toTwentiethCentury);

        year = yearToNum.toString();
      }

      if (toFormat[i] === formatYearTwoChars) {
        year = year.length === 4 ? year.slice(2) : year;
      }
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case formatMonth:
        formattedDate += month + divider;
        break;
      case formatDay:
        formattedDate += day + divider;
        break;
      case formatYearFourChars:
        formattedDate += year + divider;
        break;
      case formatYearTwoChars:
        formattedDate += year.slice(2) + divider;
        break;
      default: formattedDate += toFormat[i] + divider;
        break;
    }
  }

  return formattedDate.slice(0, -1);
}
module.exports = formatDate;
