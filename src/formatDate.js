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
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];

  let day;
  let month;
  let year;
  let yearShort;

  for (let i = 0; i < dateArray.length; i++) {
    switch (true) {
      case fromFormat[i] === 'DD':
        day = dateArray[i];
        break;

      case fromFormat[i] === 'MM':
        month = dateArray[i];
        break;

      case fromFormat[i] === 'YY' && dateArray[i] < 30:
        year = `${20 + dateArray[i]}`;
        yearShort = dateArray[i];
        break;

      case fromFormat[i] === 'YY' && dateArray[i] >= 30:
        year = `${19 + dateArray[i]}`;
        yearShort = dateArray[i];
        break;

      case fromFormat[i] === 'YYYY':
        year = dateArray[i];
        yearShort = dateArray[i].slice(0, 2);
        break;
    }
  }

  for (let i = 0; i < dateArray.length; i++) {
    switch (true) {
      case toFormat[i] === 'DD':
        newDate.push(day);
        break;

      case toFormat[i] === 'MM':
        newDate.push(month);
        break;

      case toFormat[i] === 'YY' && yearShort < 30:
        newDate.push(year.slice(2, 4));
        break;

      case toFormat[i] === 'YYYY':
        newDate.push(year);
        break;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
