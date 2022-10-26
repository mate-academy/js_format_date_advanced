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
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];

  let oldYear = '';

  if (fromFormat.includes('YY')) {
    oldYear = oldDate[fromFormat.indexOf('YY')];
  } else {
    oldYear = oldDate[fromFormat.indexOf('YYYY')];
  }

  for (const part of toFormat) {
    switch (part) {
      case 'DD':
        newDate.push(oldDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        newDate.push(oldDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (oldYear.length === 2) {
          newDate.push(oldYear);
        } else {
          newDate.push(oldYear.slice(2));
        }
        break;

      case 'YYYY':
        if (oldYear.length === 4) {
          newDate.push(oldYear);
        } else {
          if (+oldYear < 30) {
            newDate.push('20' + oldYear);
          } else {
            newDate.push('19' + oldYear);
          }
        }
        break;

      default:
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;

formatDate('20/02/18', ['YY', 'MM', 'DD', '/'], ['YYYY', 'MM', 'DD', '.']);
