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
  const oldSep = fromFormat.slice(-1);
  const numbers = date.split(oldSep);
  const oldDate = fromFormat.slice(0, 3);
  const newDate = toFormat.slice(0, 3);
  const result = [];
  const newSep = toFormat.slice(-1);

  let year, month, day;

  for (let i = 0; i < oldDate.length; i++) {
    switch (oldDate[i]) {
      case 'DD':
        day = numbers[i];
        break;

      case 'MM':
        month = numbers[i];
        break;

      case 'YY':
        year = numbers[i];

        if (year.length < 4) {
          year = Number(year) < 30 ? `20${year}` : `19${year}`;
        }
        break;

      case 'YYYY':
        year = numbers[i];
        break;
    }
  }

  for (let j = 0; j < newDate.length; j++) {
    switch (newDate[j]) {
      case 'DD':
        result.push(day);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'YYYY':
        result.push(year);
        break;

      case 'YY':
        result.push(year.slice(-2));
        break;
    }
  }

  return result.join(newSep).toString();
}

module.exports = formatDate;
