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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const fromFormatArray = date.split(fromSeparator);

  const dateMap = {};

  fromFormat.forEach((element, index) => {
    switch (element) {
      case 'YY':
        dateMap.yy = fromFormatArray[index];
        break;
      case 'YYYY':
        dateMap.yy = fromFormatArray[index];
        break;
      case 'MM':
        dateMap.mm = fromFormatArray[index];
        break;
      case 'DD':
        dateMap.dd = fromFormatArray[index];
    }
  });

  const resultArray = [];

  toFormat.forEach(element => {
    switch (element) {
      case 'YYYY':
        resultArray.push(formatYear(element, dateMap.yy));
        break;
      case 'YY':
        resultArray.push(formatYear(element, dateMap.yy));
        break;
      case 'MM':
        resultArray.push(dateMap.mm);
        break;
      case 'DD':
        resultArray.push(dateMap.dd);
        break;
    }
  });

  return resultArray.join(toSeparator);
}

function formatYear(format, year) {
  const century = (year < 30) ? 20 : 19;

  if (year.length === 4 && format.length === 2) {
    return year.slice(2);
  }

  if (year.length === 2 && format.length === 4) {
    return century + year;
  }

  return year;
}

module.exports = formatDate;
