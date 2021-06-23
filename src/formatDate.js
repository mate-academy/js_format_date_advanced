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
  const dateToArr = date.split(fromFormat[3]);
  const toFormatArray = [];
  const addElToArr = (param, sliceIdx = 0, yearFormat = '') =>
    toFormatArray.push(
      yearFormat + dateToArr[fromFormat.indexOf(param)].slice(sliceIdx)
    );

  for (let i = 0; i < dateToArr.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        addElToArr('DD');
        break;
      case 'MM':
        addElToArr('MM');
        break;
      case 'YY':
        if (fromFormat.includes('YY')) {
          toFormatArray.push(dateToArr[fromFormat.indexOf('YY')]);
          addElToArr('YY');
        } else {
          addElToArr('YYYY', 2);
        }
        break;
      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          addElToArr('YYYY');
        } else {
          if (+dateToArr[fromFormat.indexOf('YY')] > 20) {
            addElToArr('YY', 0, '19');
          } else {
            addElToArr('YY', 0, '20');
          }
        }
        break;
    }
  }

  return toFormatArray.join(toFormat[3]);
}

module.exports = formatDate;
