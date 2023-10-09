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
  const obj = {};
  const splittedDate = date.split(fromFormat[fromFormat.length - 1]);
  const newArr = [];
  let year = 0;
  let month = 0;
  let day = 0;
  let newYear = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    obj[fromFormat[i]] = splittedDate[i];
  }

  for (const key of Object.keys(obj)) {
    switch (key) {
      case 'YY':
        year = obj[key];
        break;
      case 'YYYY':
        year = obj[key];
        break;
      case 'MM':
        month = obj[key];
        break;
      case 'DD':
        day = obj[key];
    }
  }
  newYear = year;

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    if (year < 30) {
      newYear = `20${year}`;
    } else {
      newYear = `19${year}`;
    }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    newYear = `${year.toString().slice(-2)}`;
  }

  for (let i = 0; i <= 2; i++) {
    switch (toFormat[i]) {
      case 'MM':
        newArr.push(month);
        break;
      case 'DD':
        newArr.push(day);
        break;
      case 'YY':
        newArr.push(newYear);
        break;
      case 'YYYY':
        newArr.push(newYear);
        break;
    }
  }

  return newArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
