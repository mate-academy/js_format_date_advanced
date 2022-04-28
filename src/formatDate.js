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
  // happy checking

  const inputArray = date.split('');
  const result = [];

  for (let i = 0; i < inputArray.length; i++) {
    if (isNaN(inputArray[i] / 2)) {
      inputArray[i] = ' ';
    }
  }

  const threeElements = inputArray.join('').split(' ');

  const YYwanted = toFormat.indexOf('YY') !== -1;
  const YYYYwanted = toFormat.indexOf('YYYY') !== -1;

  if (YYwanted) {
    // change current format to match the desired
    fromFormat[fromFormat.indexOf('YYYY')] = 'YY';

    // change current date to match the desired
    threeElements[fromFormat.indexOf('YY')]
    = threeElements[fromFormat.indexOf('YY')].slice(2);
  }

  if (YYYYwanted) {
    // change current format to match the desired
    fromFormat[fromFormat.indexOf('YY')] = 'YYYY';

    // change the current date to integer
    threeElements[fromFormat.indexOf('YYYY')]
    = parseInt(threeElements[fromFormat.indexOf('YYYY')]);

    const currentDate = threeElements[fromFormat.indexOf('YYYY')];

    if (currentDate < 30) {
      threeElements[fromFormat.indexOf('YYYY')] += 2000;
    } else if (currentDate < 100) {
      threeElements[fromFormat.indexOf('YYYY')] += 1900;
    }
  }

  for (let i = 0; i < 3; i++) {
  /* arrange the current date depending on current
  date format with indexes from the desired format */
    result.push(threeElements[fromFormat.indexOf(toFormat[i])]);
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
