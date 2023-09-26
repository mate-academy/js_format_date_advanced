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
  const division = fromFormat[fromFormat.length - 1];
  const dividedDate = date.split(division);

  const formatMap = {};

  fromFormat.forEach((part, index) => {
    if (part !== division) {
      formatMap[part] = dividedDate[index];
    }
  });

  let year = formatMap['YYYY'] || formatMap['YY'];
  const month = formatMap['MM'];
  const day = formatMap['DD'];

  if (year) {
    if (year.length === 4 && toFormat.includes('YY')) {
      year = year.substring(2);
    } else if (year === '00' && toFormat.includes('YYYY')) {
      year = 2000;
    } else if (year.length === 2 && toFormat.includes('YYYY')) {
      year = parseInt(year, 10);

      if (year === 2000) {
        return;
      }

      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }
  }

  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      formattedDateParts.push(year);
    } else if (toFormat[i] === 'MM') {
      formattedDateParts.push(month);
    } else if (toFormat[i] === 'DD') {
      formattedDateParts.push(day);
    }
  }

  const formattedDate = formattedDateParts.join(toFormat[toFormat.length - 1]);

  return formattedDate;
}

module.exports = formatDate;
