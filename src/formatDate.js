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
 *   fromFormat['YY', 'MM', 'DD', '/'],
 *   toFormat['DD', 'MM', 'YYYY', '.'],
 * ) // return '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string[]}
 */

function formatDate(date, fromFormat, toFormat) {
  if (fromFormat[0] === toFormat[0] && fromFormat[2] === toFormat[2]) {
    return date.split(`${fromFormat[3]}`).join(`${toFormat[3]}`);
  }

  if (fromFormat[0] === toFormat[2] && fromFormat[2] === toFormat[0]) {
    return date
      .split(`${fromFormat[3]}`)
      .reverse()
      .join(`${toFormat[3]}`);
  }

  const splitDate = date.split(`${fromFormat[3]}`);

  if (fromFormat[2] !== toFormat[2] && fromFormat[2] === 'YYYY') {
    if (splitDate[2].slice(2) >= 30) {
      splitDate[2] = splitDate[2].slice(2);

      return splitDate.join(`${toFormat[3]}`);
    }

    if (splitDate[0].slice(2) < 30) {
      splitDate[2] = splitDate[2].slice(2);

      return splitDate.join(`${toFormat[3]}`);
    }
  }

  if (fromFormat[0] !== toFormat[0]) {
    if (fromFormat[0] === 'YY' && toFormat[0] === 'YYYY') {
      if (splitDate[0] >= 30) {
        splitDate[0] = '19' + splitDate[0];

        return splitDate.join(`${toFormat[3]}`);
      }

      if (splitDate[0] < 30) {
        splitDate[0] = '20' + splitDate[0];

        return splitDate.join(`${toFormat[3]}`);
      }
    }
  }

  if (fromFormat[1] === 'YYYY' && toFormat[1] === 'MM') {
    const anotherVariant = [];

    anotherVariant[0] = splitDate[2];
    anotherVariant[1] = splitDate[0];
    anotherVariant[2] = splitDate[1];

    return anotherVariant.join(`${toFormat[3]}`);
  }

  return '';
}

module.exports = formatDate;
