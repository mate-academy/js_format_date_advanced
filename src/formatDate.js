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
  const startDay = date.split(fromFormat[3]);
  const numMass = [];
  const newMass = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (fromFormat[j] === toFormat[i]) {
        numMass.push(j);
      } else if (fromFormat[j] === 'YY' && toFormat[i] === 'YYYY') {
        if (startDay[j] > 20) {
          startDay[j] = `19${startDay[j]}`;
        } else {
          startDay[j] = `20${startDay[j]}`;
        }
        numMass.push(j);
      } else if (fromFormat[j] === 'YYYY' && toFormat[i] === 'YY') {
        startDay[j] = `${startDay[j][2]}${startDay[j][3]}`;
        numMass.push(j);
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    newMass[i] = startDay[numMass[i]];
  }

  return newMass.join(toFormat[3]);
}

module.exports = formatDate;
