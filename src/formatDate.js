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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateArray = date.split(oldSeparator);
  const resultArray = [];
  let resultString = '';

  const PREFIX_PREVIOUS_CENTURY = 19;
  const PREFIX_THIS_CENTURY = 20;
  const TWO_SYMBOL_YEAR_FORMATE = 2;
  const FOUR_SYMBOL_YEAR_FORMATE = 4;
  const FORMAT_LENGTH = 3;

  for (let i = 0; i < FORMAT_LENGTH; i++) {
    for (let j = 0; j < FORMAT_LENGTH; j++) {
      if (
        toFormat[i] === fromFormat[j]
      ) {
        resultArray.push(dateArray[j]);
      } else if (
        toFormat[i].includes('Y')
        && fromFormat[j].includes('Y')
      ) {
        if (
          fromFormat[j].length === FOUR_SYMBOL_YEAR_FORMATE
          && toFormat[i].length === TWO_SYMBOL_YEAR_FORMATE
        ) {
          resultArray.push(dateArray[j].slice(2));
        } else {
          resultArray.push(
            dateArray[j] >= 30
              ? PREFIX_PREVIOUS_CENTURY + dateArray[j]
              : PREFIX_THIS_CENTURY + dateArray[j]
          );
        }
      }
    }
  }

  resultString = resultArray.join(newSeparator);

  return resultString;
}

module.exports = formatDate;
