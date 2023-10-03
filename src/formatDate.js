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
  const arrDate = date.split(fromFormat[3]);

  const outputDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const inputPart = toFormat[i];
    let year;

    const formatIndex = fromFormat.indexOf(inputPart);
    const part = arrDate[formatIndex];

    if (part === undefined) {
      switch (inputPart) {
        case 'YY':
          year = arrDate[fromFormat.indexOf('YYYY')].slice(-2);

          outputDate.push(year);
          break;

        case 'YYYY':
          year = arrDate[fromFormat.indexOf('YY')];

          // Перевірка, чи 'YY' < 30 та 'YY' = 00
          if (year < 30 || year === '00') {
            year = '20' + year;
          } else {
            year = '19' + year;
          }

          outputDate.push(year);
          break;

        default:
          break;
      }
    } else {
      outputDate.push(part);
    }
  }

  return outputDate.join(toFormat[3]);
}

module.exports = formatDate;
