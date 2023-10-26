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
  const PREV_CENTURY = '19';
  const NEXT_CENTURY = '20';
  const MIN_YEAR_FOR_PREV_CENTURY = 30;

  const YEAR_LONG = 'YYYY';
  const YEAR_SHORT = 'YY';
  const MONTH = 'MM';
  const DAY = 'DD';

  const DATE_ATTRIBUTES_LENGTH = 3;
  const DATE_FROM_SEPARATOR = fromFormat[3];
  const DATE_TO_SEPARATOR = toFormat[3];

  const previousDateArr = date.split(DATE_FROM_SEPARATOR);
  const newDateArr = [];

  for (let i = 0; i < DATE_ATTRIBUTES_LENGTH; i++) {
    for (let j = 0; j < DATE_ATTRIBUTES_LENGTH; j++) {
      if (fromFormat[i].slice(0, 2) === toFormat[j].slice(0, 2)) {
        switch (toFormat[j]) {
          case YEAR_LONG:
            if (fromFormat[i] === YEAR_LONG) {
              newDateArr[j] = previousDateArr[i];
              break;
            }

            if (parseInt(previousDateArr[i]) < MIN_YEAR_FOR_PREV_CENTURY) {
              newDateArr[j] = NEXT_CENTURY + previousDateArr[i];
              break;
            }

            newDateArr[j] = PREV_CENTURY + previousDateArr[i];
            break;

          case YEAR_SHORT:
            if (fromFormat[i] === YEAR_SHORT) {
              newDateArr[j] = previousDateArr[i];
              break;
            }

            newDateArr[j] = previousDateArr[i].slice(2);
            break;

          case MONTH:
            newDateArr[j] = previousDateArr[i];
            break;

          case DAY:
            newDateArr[j] = previousDateArr[i];
            break;

          default:
            break;
        }

        break;
      }
    }
  }

  return newDateArr.join(DATE_TO_SEPARATOR);
}

module.exports = formatDate;
