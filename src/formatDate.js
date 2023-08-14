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
  const currentSeparator = fromFormat[3];
  const desiredSeparator = toFormat[3];
  const currentFormat = fromFormat.slice(0, 3);
  const desiredFormat = toFormat.slice(0, 3);
  const dateArray = date.split(currentSeparator);
  const day = dateArray[currentFormat.indexOf('DD')];
  const month = dateArray[currentFormat.indexOf('MM')];
  const result = [];
  let year;

  if (currentFormat.includes('YYYY')) {
    year = dateArray[currentFormat.indexOf('YYYY')];
  } else {
    year = dateArray[currentFormat.indexOf('YY')];
  }

  if (currentFormat.includes('YY') && desiredFormat.includes('YYYY')) {
    if (year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }
  }

  if (currentFormat.includes('YYYY') && desiredFormat.includes('YY')) {
    year = year.slice(2);
  }

  for (let i = 0; i < desiredFormat.length; i++) {
    if (desiredFormat[i] === 'DD') {
      result.push(day);
    }

    if (desiredFormat[i] === 'MM') {
      result.push(month);
    }

    if (desiredFormat[i] === 'YY' || desiredFormat[i] === 'YYYY') {
      result.push(year);
    }
  }

  return result.join(desiredSeparator);
}

module.exports = formatDate;
