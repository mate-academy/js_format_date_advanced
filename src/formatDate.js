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
  const indexOfDay = fromFormat.indexOf('DD');
  const indexOfMonth = fromFormat.indexOf('MM');
  const indexOfYear2 = fromFormat.indexOf('YY');
  const indexOfYear4 = fromFormat.indexOf('YYYY');

  const fromFormatArray = date.split(fromFormat[fromFormat.length - 1]);
  const toFormatArray = [...toFormat];
  let alternativeYear = 0;

  if (fromFormatArray[indexOfYear2] < 30) {
    alternativeYear = 20 + fromFormatArray[indexOfYear2];
  } else {
    alternativeYear = 19 + fromFormatArray[indexOfYear2];
  }

  for (let i = 0; i < toFormatArray.length; i++) {
    if (toFormatArray[i] === 'DD') {
      toFormatArray[i] = fromFormatArray[indexOfDay];
    }

    if (toFormatArray[i] === 'MM') {
      toFormatArray[i] = fromFormatArray[indexOfMonth];
    }

    if (toFormatArray[i] === 'YYYY' && indexOfYear4 === -1) {
      toFormatArray[i] = alternativeYear;
    }

    if (toFormatArray[i] === 'YYYY') {
      toFormatArray[i] = fromFormatArray[indexOfYear4];
    }

    if (toFormatArray[i] === 'YY') {
      toFormatArray[i] = fromFormatArray[indexOfYear4].slice(2,
        indexOfYear4.length);
    }
  }

  toFormatArray.length -= 1;

  return toFormatArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
