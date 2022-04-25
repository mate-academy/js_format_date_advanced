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
  const splitDate = date.split(fromFormat[3]);
  let formatedOldDate = [...splitDate];
  const obj = {};

  switch (true) {
    case fromFormat[0] === 'YY' || fromFormat[0] === 'YYYY':
      formatedOldDate = splitDate.reverse();
      break;
    case fromFormat[0] === 'MM' && fromFormat[2] === 'DD':
      formatedOldDate.length = 0;
      formatedOldDate.push(splitDate[2], splitDate[0], splitDate[1]);
      break;
    case fromFormat[0] === 'MM':
      formatedOldDate.length = 0;
      formatedOldDate.push(splitDate[1], splitDate[0], splitDate[2]);
      break;
  }

  if (formatedOldDate[2].length === 2) {
    const year = formatedOldDate[2];

    switch (true) {
      case +year < 30:
        formatedOldDate[2] = 20 + year;
        break;
      case +year >= 30:
        formatedOldDate[2] = 19 + year;
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    obj[toFormat[i]] = '';
  }
  obj.DD = formatedOldDate[0];
  obj.MM = formatedOldDate[1];

  if (obj.hasOwnProperty('YYYY')) {
    obj.YYYY = formatedOldDate[2];
  }

  if (obj.hasOwnProperty('YY')) {
    obj.YY = formatedOldDate[2].slice(2);
  }

  const newDate = [];

  for (const value in obj) {
    newDate.push(obj[value]);
  }

  return newDate.join(toFormat[3]);
}
module.exports = formatDate;
