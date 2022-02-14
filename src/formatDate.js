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
function normalizedateNumber(num) {
  const slicedNum = num.slice(-2);
  const limit = 30;

  return (+slicedNum < limit) ? `20${num}` : `19${num}`;
}

function formatDate(date, fromFormat, toFormat) {
  const holder = {}; // type as key & dateNumber as value
  const dateFormat = [];
  const dateSplit = date.split(fromFormat[3]);

  for (let i = 0; i < dateSplit.length; i++) {
    holder[fromFormat[i].slice(-2)] = dateSplit[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const dateNumber = holder[toFormat[i].slice(-2)];

    if (toFormat[i] !== 'YY' || toFormat[i] !== 'YYYY') {
      dateFormat.push(dateNumber);
    } else {
      switch (dateNumber.length) {
        case 2:
          if (toFormat[i].length === 4) {
            dateFormat.push(normalizedateNumber(dateNumber));
          } else {
            dateFormat.push(dateNumber);
          }
          break;

        case 4:
          if (toFormat[i].length === 2) {
            dateFormat.push(dateNumber.slice(-2));
          } else {
            dateFormat.push(dateNumber);
          }
      }
    }
  }

  return dateFormat.join(`${toFormat[3]}`);
}

module.exports = formatDate;
