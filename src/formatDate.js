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
  let newDate = '';
  let index = 0;
  const dateArr = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    if (fromFormat.includes(toFormat[i])) {
      index = fromFormat.indexOf(toFormat[i]);
    } else if (fromFormat.includes('YYYY')) {
      index = fromFormat.indexOf('YYYY');
    } else {
      index = fromFormat.indexOf('YY');
    }

    if (toFormat[i] === 'YY') {
      switch (fromFormat[index]) {
        case 'YY':
          newDate += fromFormat[index];
          break;

        case 'YYYY':
          newDate += dateArr[index].slice(2);
          break;

        default:
          break;
      }
    }

    if (toFormat[i] === 'YYYY') {
      if (fromFormat[index] === 'YYYY') {
        newDate += dateArr[index];
      }

      if (fromFormat[index] === 'YY') {
        if (dateArr[index] < 30) {
          newDate += '20';
        } else {
          newDate += '19';
        }
        newDate += dateArr[index];
      }
    }

    if (toFormat[i] === 'DD' || toFormat[i] === 'MM') {
      newDate += dateArr[index];
    }

    newDate += toFormat[3];
  }

  return newDate.slice(0, -1);
}

module.exports = formatDate;
