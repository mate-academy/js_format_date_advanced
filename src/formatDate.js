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
  const entries = date.split(fromFormat[fromFormat.length - 1]);

  toFormat.forEach((el, i) => {
    switch (el) {
      case 'DD':
        const idxOfDay = fromFormat.indexOf(el);

        toFormat[i] = entries[idxOfDay];
        break;
      case 'MM':
        const idxOfMonth = fromFormat.indexOf(el);

        toFormat[i] = entries[idxOfMonth];
        break;
      case 'YY':
        if (!fromFormat.includes('YY')) {
          const idxOfYear = fromFormat.indexOf('YYYY');

          toFormat[i] = entries[idxOfYear].substring(2);
        } else {
          const idxOfYear = fromFormat.indexOf(el);

          toFormat[i] = entries[idxOfYear];
        }
        break;
      case 'YYYY':
        if (!fromFormat.includes('YYYY')) {
          const idxOfYear = fromFormat.indexOf('YY');

          if (Number(entries[idxOfYear]) > 21) {
            toFormat[i] = '19'.concat(entries[idxOfYear]);
          } else {
            toFormat[i] = '20'.concat(entries[idxOfYear]);
          }
        } else {
          const idxOfYear = fromFormat.indexOf(el);

          toFormat[i] = entries[idxOfYear];
        }
        break;
    }
  });

  const separator = toFormat.pop();

  return toFormat.join(separator);
}

module.exports = formatDate;
