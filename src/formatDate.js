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
  const separator = fromFormat[fromFormat.length - 1];
  const joiner = toFormat[toFormat.length - 1];
  const dateArr = date.split(separator);
  const previosYearIndex = fromFormat.findIndex(e => e[0] === 'Y');
  const newYearIndex = toFormat.findIndex(e => e[0] === 'Y');
  const yearNormalize = normilizeYear(
    fromFormat[previosYearIndex],
    toFormat[newYearIndex],
    dateArr[previosYearIndex]
  );
  const newData = [];

  for (let x = 0; x < dateArr.length; x++) {
    const replaceIndex = fromFormat.indexOf(toFormat[x]);

    if (replaceIndex === -1) {
      newData.push(yearNormalize);
    } else {
      newData.push(dateArr[replaceIndex]);
    }
  }

  return newData.join(joiner);
}

function normilizeYear(oldFormat, newFormat, year) {
  if (oldFormat.length > newFormat.length) {
    return year.slice(2);
  }

  if (oldFormat.length < newFormat.length) {
    if (+year < 30) {
      return `20${year}`;
    } else {
      return `19${year}`;
    }
  }

  return year;
}

module.exports = formatDate;
