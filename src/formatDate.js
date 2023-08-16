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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const TWO_DIGIT_YEAR = 'YY';
  const FOUR_DIGIT_YEAR = 'YYYY';
  const XX_CENTURY = '19';
  const XXI_CENTURY = '20';
  const CONVERSION_LIMIT = '30';
  const splittedDate = date.split(oldSeparator);
  const sortedDate = {};
  let formattedDate = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === TWO_DIGIT_YEAR
      && toFormat.includes(FOUR_DIGIT_YEAR)) {
      let yearModulator = XXI_CENTURY;

      if (+splittedDate[i] >= CONVERSION_LIMIT) {
        yearModulator = XX_CENTURY;
      }

      sortedDate[FOUR_DIGIT_YEAR] = yearModulator + splittedDate[i];
      continue;
    }

    if (fromFormat[i] === FOUR_DIGIT_YEAR
      && toFormat.includes(TWO_DIGIT_YEAR)) {
      sortedDate[TWO_DIGIT_YEAR] = splittedDate[i].slice(2);
      continue;
    }

    sortedDate[fromFormat[i]] = splittedDate[i];
  }

  for (let i = 0; i < 2; i++) {
    formattedDate += sortedDate[toFormat[i]] + newSeparator;
  }

  formattedDate += sortedDate[toFormat[2]];

  return formattedDate;
}

module.exports = formatDate;
