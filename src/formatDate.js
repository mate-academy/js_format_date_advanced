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
  const dateParts = date.split(fromFormat[3]);
  let day;
  let month;
  let unfixedYear;
  let newFormatYear;

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateParts[i];
        break;

      case 'MM':
        month = dateParts[i];
        break;

      case 'YY':
      case 'YYYY':
        unfixedYear = dateParts[i];
        break;
    }

    if (toFormat[i].includes('Y')) {
      newFormatYear = toFormat[i];
    }
  }

  const fixedYear = fixedYears(unfixedYear, newFormatYear);
  const correcOrderedDate = [];

  for (const part of toFormat) {
    switch (part) {
      case 'DD':
        correcOrderedDate.push(day);
        break;

      case 'MM':
        correcOrderedDate.push(month);
        break;

      case 'YY':
      case 'YYYY':
        correcOrderedDate.push(fixedYear);
        break;
    }
  }

  return correcOrderedDate.join(toFormat[3]);
}

function fixedYears(input, required) {
  if (input.length < required.length) {
    return (input < 30 ? '20' : '19') + input;
  }

  if (input.length > required.length) {
    return input.slice(-2);
  }

  return input;
}
module.exports = formatDate;
