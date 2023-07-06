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
  const splitedDate = date.split(fromFormat[3]);
  let year = '';
  let month = '';
  let day = '';

  for (let i = 0; i < toFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = splitedDate[i];
        break;

      case 'YY':
        year = splitedDate[i];
        break;

      case 'MM':
        month = splitedDate[i];
        break;

      case 'DD':
        day = splitedDate[i];
        break;
    }
  }

  const result = [];

  const correctYear = transformYear(year, fromFormat, toFormat);

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result[result.length] = day;
        break;

      case 'MM':
        result[result.length] = month;
        break;

      case 'YY':
        result[result.length] = correctYear;
        break;

      case 'YYYY':
        result[result.length] = correctYear;
        break;
    }
  }

  return result.join(toFormat[3]);
};

function transformYear(year, oldFormat, newFormat) {
  let oldIndex = 0;
  let newIndex = 0;
  const correctYear = [];

  correctYear.push(year);

  for (let i = 0; i < oldFormat.length; i++) {
    if (oldFormat[i] === 'YY' || oldFormat[i] === 'YYYY') {
      oldIndex += i;
    }
  }

  for (let i = 0; i < newFormat.length; i++) {
    if (newFormat[i] === 'YY' || newFormat[i] === 'YYYY') {
      newIndex += i;
    }
  }

  if (oldFormat[oldIndex] === newFormat[newIndex]) {
    return year;
  }

  if (oldFormat[oldIndex] === 'YYYY' && newFormat[newIndex] === 'YY') {
    const shortYear = year.slice(2, 4);

    return shortYear;
  }

  if (oldFormat[oldIndex] === 'YY' && newFormat[newIndex] === 'YYYY') {
    if (year < 30) {
      correctYear.unshift('20');

      return correctYear.join('');
    } else {
      correctYear.unshift('19');

      return correctYear.join('');
    }
  }
}

module.exports = formatDate;
