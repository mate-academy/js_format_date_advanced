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
  const arrResult = [];

  const getYearIndex = arr =>
    arr.indexOf('YYYY') === -1
      ? arr.indexOf('YY')
      : arr.indexOf('YYYY');

  const getValue = (from, to, realValue) => {
    if (from.length === 2 && to.length === 4) {
      return Number(realValue) < 30
        ? `20${realValue}`
        : `19${realValue}`;
    }

    if (from.length === 4 && to.length === 2) {
      return realValue.slice(-2);
    }

    return realValue;
  };

  const splited = date.split(fromFormat[3]);

  [...fromFormat]
    .slice(0, 3)
    .forEach((el, index) => {
      if (toFormat.indexOf(el) === -1) {
        const newIndex = getYearIndex(toFormat);

        arrResult[newIndex] = getValue(el, toFormat[newIndex], splited[index]);
      } else {
        arrResult[toFormat.indexOf(el)] = splited[index];
      }
    });

  return arrResult.join(toFormat[3]);
}

module.exports = formatDate;
