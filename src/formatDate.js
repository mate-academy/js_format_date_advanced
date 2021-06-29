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
  // write code here
  const oldFormat = date.split(fromFormat[3]);
  const newFormat = [];
  const currentDate = {
    [fromFormat[0]]: oldFormat[0],
    [fromFormat[1]]: oldFormat[1],
    [fromFormat[2]]: oldFormat[2],
    separator: toFormat[3],
  };
  let yearIndex;

  for (const element of fromFormat) {
    if (element.includes('Y')) {
      yearIndex = fromFormat.indexOf(element);
      break;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i].includes('Y')) {
      const oldYearFormat = fromFormat[yearIndex];
      const year = currentDate[oldYearFormat];

      if (toFormat[i] === oldYearFormat) {
        newFormat.push(year);
      } else {
        newFormat.push(convertYearFormat(year, toFormat[i]));
      }
    } else {
      newFormat.push(`${currentDate[toFormat[i]]}`);
    }
  }

  return newFormat.join(currentDate.separator);
}

function convertYearFormat(year, yearFormat) {
  const yearOfPastCentury = 30;

  switch (true) {
    case (yearFormat === 'YY'):
      return year.slice(2);

    case (yearFormat === 'YYYY'):
      if (year >= yearOfPastCentury) {
        return `19${year}`;
      } else {
        return `20${year}`;
      }
  }
}

module.exports = formatDate;
