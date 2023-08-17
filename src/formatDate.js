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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const parts = date.split(oldSeparator);
  const day = parts[fromFormat.indexOf('DD')];
  const month = parts[fromFormat.indexOf('MM')];

  const newDate = [];

  for (let i = 0; i < parts.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate.push(day);
        break;

      case 'MM':
        newDate.push(month);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          newDate.push(parts[fromFormat.indexOf('YY')]);
        } else {
          newDate.push(parts[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          newDate.push(parts[fromFormat.indexOf('YYYY')]);
        } else {
          if (+parts[fromFormat.indexOf('YY')] >= 30) {
            newDate.push('19' + parts[fromFormat.indexOf('YY')]);
          } else {
            newDate.push('20' + parts[fromFormat.indexOf('YY')]);
          }
        }
        break;
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
