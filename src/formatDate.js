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
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const objDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case `DD`:
        objDate.day = dateArr[i];
        break;

      case `MM`:
        objDate.month = dateArr[i];
        break;

      case `YYYY`:
        objDate.year = dateArr[i];
        break;

      case `YY`:
        objDate.year = dateArr[i];
        break;
    }
  }

  if (fromFormat.includes(`YYYY`) && toFormat.includes(`YY`)) {
    objDate.year = objDate.year.split(``).slice(2).join(``);
  }

  if (fromFormat.includes(`YY`) && toFormat.includes(`YYYY`)
   && +objDate.year < 30) {
    objDate.year = objDate.year.split(` `);
    objDate.year.unshift(`20`);
    objDate.year = objDate.year.join(``);
  } else if (fromFormat.includes(`YY`) && toFormat.includes(`YYYY`)
   && +objDate.year >= 30) {
    objDate.year = objDate.year.split(` `);
    objDate.year.unshift(`19`);
    objDate.year = objDate.year.join(``);
  }

  const formatedArr = [];

  for (const value of toFormat) {
    switch (value) {
      case `DD`:
        formatedArr.push(objDate.day);
        break;

      case `MM`:
        formatedArr.push(objDate.month);
        break;

      case `YYYY`:
        formatedArr.push(objDate.year);
        break;

      case `YY`:
        formatedArr.push(objDate.year);
        break;
    }
  }

  const formatedDate = formatedArr.join(toFormat[toFormat.length - 1]);

  return formatedDate;
}
module.exports = formatDate;
