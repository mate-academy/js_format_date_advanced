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
  const dateArray = date.split(fromFormat[3]);
  const newDate = [...toFormat];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let n = 0; n < toFormat.length - 1; n++) {
      if (fromFormat[i] === 'DD' && toFormat[n] === 'DD') {
        newDate[n] = dateArray[i];
      }

      if (fromFormat[i] === 'MM' && toFormat[n] === 'MM') {
        newDate[n] = dateArray[i];
      }

      if (fromFormat[i].includes('Y') && toFormat[n].includes('Y')) {
        if (toFormat[n] === 'YYYY') {
          if (fromFormat[i] === 'YY') {
            if (+dateArray[i] < 30) {
              newDate[n] = `20${dateArray[i]}`;
            }

            if (+dateArray[i] >= 30) {
              newDate[n] = `19${dateArray[i]}`;
            }
          } else {
            newDate[n] = dateArray[i];
          }
        }

        if (toFormat[n] === 'YY') {
          newDate[n] = dateArray[i].slice(2, 4);
        }
      }
    }
  }

  newDate.splice(3, 1);

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
