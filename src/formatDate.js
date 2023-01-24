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
  function getIndex(value) {
    return fromFormat.indexOf(value);
  }

  const newDate = [];
  const oldDate = date.split(fromFormat[3]);

  for (const item of toFormat) {
    switch (item) {
      case ('DD'):
        newDate.push(oldDate[getIndex('DD')]);
        break;

      case ('MM'):
        newDate.push(oldDate[getIndex('MM')]);
        break;

      case ('YY'):
        if (getIndex('YY') !== -1) {
          newDate.push(oldDate[getIndex('YY')]);
        } else {
          newDate.push(oldDate[getIndex('YYYY')].slice(2));
        }
        break;

      case ('YYYY'):
        if (getIndex('YYYY') !== -1) {
          newDate.push(oldDate[getIndex('YYYY')]);
        } else if (oldDate[getIndex('YY')] < 30) {
          newDate.push('20' + oldDate[getIndex('YY')]);
        } else {
          newDate.push('19' + oldDate[getIndex('YY')]);
        }
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
