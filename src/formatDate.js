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
  const newSeparator = toFormat.slice(-1);
  const getDate = date.split(fromFormat[3]);
  const newArr = [];

  let day, month, year;

  for (let i = 0; i < fromFormat.length; i++) {
    const element = getDate[i];
    const format = fromFormat[i];

    switch (true) {
      case format.includes('Y'): {
        year = element;

        break;
      }

      case format.includes('M'): {
        month = element;

        break;
      }

      case format.includes('D'): {
        day = element;

        break;
      }

      default:
        break;
    }
  }

  for (const format of toFormat) {
    if (format.includes('Y')) {
      const prefix = year < 30 ? '20' : '19';
      const fullYear = prefix + year;

      if (format.length < year.length) {
        newArr.push(year.slice(2));
      } else if (format.length === year.length) {
        newArr.push(year);
      } else {
        newArr.push(fullYear);
      }
    }

    if (format.includes('M')) {
      newArr.push(month);
    }

    if (format.includes('D')) {
      newArr.push(day);
    }
  }

  return newArr.join(newSeparator);
}

module.exports = formatDate;
