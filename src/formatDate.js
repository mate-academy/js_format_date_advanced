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
  let year = '';
  let month = '';
  let day = '';
  const [,,, separatorFF] = fromFormat;
  const [,,, separatorNF] = toFormat;

  const dates = date.split(separatorFF);
  const newFormat = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = dates[i];
        break;
      case 'MM':
        month = dates[i];
        break;
      case 'DD':
        day = dates[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        if (toFormat[i].length < year.length) {
          newFormat.push(year.slice(2));
        } else {
          newFormat.push(year);
        }
        break;
      case 'YYYY':
        if (toFormat[i].length > year.length
          && year < 30) {
          newFormat.push(`20${year}`);
        } else if (toFormat[i].length > year.length
          && year >= 30) {
          newFormat.push(`19${year}`);
        } else {
          newFormat.push(year);
        }
        break;
      case 'MM':
        newFormat.push(month);
        break;
      case 'DD':
        newFormat.push(day);
        break;
    }
  }

  return newFormat.join(separatorNF);
}

module.exports = formatDate;
