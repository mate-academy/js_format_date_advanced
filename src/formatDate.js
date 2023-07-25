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
  const [, , , signFrom] = fromFormat;
  const [, , , signTo] = toFormat;
  const dateToArr = date.split(signFrom);
  const partsDate = [];

  let yearIndex = -1;

  if (fromFormat.includes('YYYY')) {
    yearIndex = fromFormat.indexOf('YYYY');
  } else if (fromFormat.includes('YY')) {
    yearIndex = fromFormat.indexOf('YY');
  }

  for (const index of toFormat) {
    if (index === 'YYYY') {
      const year = dateToArr[yearIndex];

      partsDate.push(formatYear(year));
    } else if (index === 'YY') {
      const year = dateToArr[yearIndex];

      partsDate.push(formatYear(year).slice(-2));
    } else {
      partsDate.push(dateToArr[fromFormat.indexOf(index)]);
    }
  }

  return partsDate.slice(0, 3).join(signTo);

  function formatYear(year) {
    if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      return year < 30 ? `20${year}` : `19${year}`;
    } else {
      return year;
    }
  }
}

module.exports = formatDate;
