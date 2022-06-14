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
  const separatoroldDateFormat = fromFormat[3];
  const separatornewDateFormat = toFormat[3];

  const oldDateFormat = date.split(separatoroldDateFormat);
  const newDateFormat = [];

  for (let i = 0; i < oldDateFormat.length; i++) {
    const isDifferentYearFormat = fromFormat[i].includes('Y')
      && toFormat.indexOf(fromFormat[i]) < 0;

    if (isDifferentYearFormat) {
      if (fromFormat[i] === 'YYYY') {
        oldDateFormat[i] = oldDateFormat[i].slice(2);

        newDateFormat[toFormat.indexOf('YY')] = oldDateFormat[i];
      } else if (fromFormat[i] === 'YY') {
        const years = +oldDateFormat[i] < 30 ? 20 : 19;

        newDateFormat[i] = years + oldDateFormat[i];
      }
    }

    newDateFormat[toFormat.indexOf(fromFormat[i])] = oldDateFormat[i];
  }

  return newDateFormat.join(separatornewDateFormat);
}

module.exports = formatDate;
