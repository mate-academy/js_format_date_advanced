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
  const dateParts = date.split(fromFormat[3]);

  const day = 'DD';
  const month = 'MM';
  const yearYYYY = 'YYYY';
  const yearYY = 'YY';

  let pastFormatYear = '';

  const indexDayFromFormat = fromFormat.indexOf(day);
  const indexMonthFromFormat = fromFormat.indexOf(month);
  let indexYearFromFormat = 2;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === yearYYYY) {
      indexYearFromFormat = i;
      pastFormatYear = yearYYYY;
    }

    if (fromFormat[i] === yearYY) {
      indexYearFromFormat = i;
      pastFormatYear = yearYY;
    }
  }

  const dayNumber = dateParts[indexDayFromFormat];
  const monthNumber = dateParts[indexMonthFromFormat];
  const yearNumber = dateParts[indexYearFromFormat];

  const newDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === day) {
      newDate.push(dayNumber);
    }

    if (toFormat[i] === month) {
      newDate.push(monthNumber);
    }

    if (toFormat[i] === yearYYYY && pastFormatYear === yearYY
      && (yearNumber === '00' || +yearNumber < 30)) {
      newDate.push(`20${yearNumber}`);
    }

    if (toFormat[i] === yearYYYY && pastFormatYear === yearYY
      && (+yearNumber >= 30)) {
      newDate.push(`19${yearNumber}`);
    }

    if (toFormat[i] === yearYYYY && pastFormatYear === yearYYYY) {
      newDate.push(yearNumber);
    }

    if (toFormat[i] === yearYY && pastFormatYear === yearYY) {
      newDate.push(yearNumber);
    }

    if (toFormat[i] === yearYY && pastFormatYear === yearYYYY
      && yearNumber.length === 4
    ) {
      const array = [];

      array.push(yearNumber[2]);
      array.push(yearNumber[3]);
      newDate.push(array.join(''));
    }
  }

  const finishDate = newDate.join(toFormat[3]);

  return finishDate;
}

module.exports = formatDate;
