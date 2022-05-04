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
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const inputArray = date.split(fromSeparator);
  const result = [];

  const YYwanted = toFormat.indexOf('YY') !== -1;
  const YYYYwanted = toFormat.indexOf('YYYY') !== -1;

  if (YYwanted) {
    // change current format to match the desired
    fromFormat[fromFormat.indexOf('YYYY')] = 'YY';

    // change current date to match the desired
    inputArray[fromFormat.indexOf('YY')]
    = inputArray[fromFormat.indexOf('YY')].slice(2);
  }

  if (YYYYwanted) {
    // change current format to match the desired
    fromFormat[fromFormat.indexOf('YY')] = 'YYYY';

    // change the current date to integer
    inputArray[fromFormat.indexOf('YYYY')]
    = parseInt(inputArray[fromFormat.indexOf('YYYY')]);

    const currentDate = inputArray[fromFormat.indexOf('YYYY')];

    if (currentDate < 30) {
      inputArray[fromFormat.indexOf('YYYY')] += 2000;
    } else if (currentDate < 100) {
      inputArray[fromFormat.indexOf('YYYY')] += 1900;
    }
  }

  for (let i = 0; i < 3; i++) {
  /* arrange the current date depending on current
  date format with indexes from the desired format */
    result.push(inputArray[fromFormat.indexOf(toFormat[i])]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
