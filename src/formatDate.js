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

/**
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const lastElement = fromFormat[fromFormat.length - 1];
  const newElement = toFormat[toFormat.length - 1];
  const splitOldFormat = date.split(lastElement);
  const year = fromFormat.indexOf('YYYY');
  const month = fromFormat.indexOf('MM');
  const day = fromFormat.indexOf('DD');

  let newFormat = '';

  for (let i = 0; i < splitOldFormat.length; i++) {
    newFormat += splitOldFormat[i] + newElement;
  }

  const newFormat2 = newFormat.slice(0, -1);
  const newFormat3 = newFormat2.split(newElement);

  let newDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      const indexYy = fromFormat.indexOf('YY');

      if (newFormat3[indexYy] < 30) {
        newDate = '20' + newFormat3[indexYy];
      } else {
        newDate = '19' + newFormat3[indexYy];
      }
    } else if (toFormat[i] === 'YYYY') {
      newDate += newFormat3[year];
    } else if (toFormat[i] === 'YY') {
      newDate += newFormat3[year].slice(2);
    } else if (toFormat[i] === 'MM') {
      newDate += newFormat3[month];
    } else if (toFormat[i] === 'DD') {
      newDate += newFormat3[day];
    }

    if (i < toFormat.length - 1) {
      newDate += newElement;
    }
  }

  const newString = newDate.slice(0, -1);

  return newString;
}

module.exports = formatDate;
