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

  const splitedData = date.split(oldSeparator);

  if (fromFormat[0] === toFormat[2]) {
    return splitedData.reverse().join(newSeparator);
  }

  if (
    fromFormat[2][0] === toFormat[2][0]
    && fromFormat[2].length > toFormat[2].length
  ) {
    const splitedDataPush = splitedData[2];

    splitedData.pop();
    splitedData.push(splitedDataPush - 1900);
  }

  if (
    fromFormat[0][0] === toFormat[0][0]
    && fromFormat[0].length < toFormat[0].length
  ) {
    const yearFromFormat = +splitedData[0];

    if (yearFromFormat < 30) {
      const thisCentury = 2000 + yearFromFormat;

      splitedData.shift();
      splitedData.unshift(thisCentury);
    }

    if (yearFromFormat >= 30) {
      const lastCentury = 1900 + yearFromFormat;

      splitedData.shift();
      splitedData.unshift(lastCentury);
    }
  }

  return splitedData.join(newSeparator);
}

module.exports = formatDate;
