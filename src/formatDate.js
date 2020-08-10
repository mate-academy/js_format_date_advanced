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
  const splitDate = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < splitDate.length; i++) {
    let year;

    if (toFormat[i] === 'DD') {
      newDate.push(splitDate[fromFormat.indexOf('DD')]);
    } else if (toFormat[i] === 'MM') {
      newDate.push(splitDate[fromFormat.indexOf('MM')]);
    } else if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      for (const elem of fromFormat) {
        if (elem.includes('Y') && toFormat[i].length < 4) {
          year = splitDate[fromFormat.indexOf('YYYY')].slice(2);

          newDate.push(year);
          break;
        } else if (elem.includes('Y') && toFormat[i].length === 4) {
          if(elem.length === 2) {
            year = splitDate[fromFormat.indexOf('YY')];

            if (year >= 30) {
              newDate.push(`19${year}`);
              break;
            } else {
              newDate.push(`20${year}`);
              break;
            }
          }
          year = splitDate[fromFormat.indexOf('YYYY')];

          newDate.push(year);
          break;
        }
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
