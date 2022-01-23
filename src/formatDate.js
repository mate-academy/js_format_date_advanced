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
  const datePartsProvidedOrder = date.split(fromFormat[3]);
  const datePartsNeededOrder = [];
  let day = '';
  let month = '';
  let yearLong = '';
  let yearShort = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        yearLong = datePartsProvidedOrder[i];
        yearShort = yearLong.slice(2);
        break;

      case 'YY':
        yearShort = datePartsProvidedOrder[i];

        if (+yearShort < 30) {
          yearLong = 20 + yearShort;
        } else {
          yearLong = 19 + yearShort;
        }
        break;

      case 'MM':
        month = datePartsProvidedOrder[i];
        break;

      case 'DD':
        day = datePartsProvidedOrder[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        datePartsNeededOrder.push(yearLong);
        break;

      case 'YY':
        datePartsNeededOrder.push(yearShort);
        break;

      case 'MM':
        datePartsNeededOrder.push(month);
        break;

      case 'DD':
        datePartsNeededOrder.push(day);
        break;

      default:
        break;
    }
  }

  return datePartsNeededOrder.join(toFormat[3]);
}

module.exports = formatDate;
