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
 * @param {string[]} oldDate
 * @param {string[]} newDate
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldDate = fromFormat;
  const newDate = toFormat;
  const oldDateSymb = oldDate.pop();
  const newDateSymb = newDate.pop();

  const dateSplit = date.split(oldDateSymb);

  for (let i = 0; i < oldDate.length; i++) {
    for (let k = 0; k < newDate.length; k++) {
      if (oldDate[i] === newDate[k]) {
        newDate[k] = dateSplit[i];
      } else if (oldDate[i] === 'YYYY' && newDate[k] === 'YY') {
        newDate[k] = dateSplit[i].slice(2);
      } else if (oldDate[i] === 'YY' && newDate[k] === 'YYYY') {
        if (+dateSplit[i] >= 30) {
          newDate[k] = '19' + dateSplit[i];
        } else {
          newDate[k] = '20' + dateSplit[i];
        }
      }
    }
  }

  const newFormatDate = newDate.join(newDateSymb);

  return newFormatDate;
}

module.exports = formatDate;
