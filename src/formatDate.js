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

  if (formatMap['YY']) {
    year = parseInt(year, 10);

    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  const reorderedDate = toFormat.map((part) => {
    if (part === 'YYYY' || part === 'YY') {
      return year;
    } else if (part === 'MM') {
      return month;
    } else if (part === 'DD') {
      return day;
    } else {
      return part;
    }
  });

  return reorderedDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
