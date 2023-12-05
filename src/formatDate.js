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
  const newElement = date.split(fromFormat[3]);
  let yearPosition = fromFormat.indexOf('YYYY');
  const monthPosition = fromFormat.indexOf('MM');
  const dayPosition = fromFormat.indexOf('DD');

  if (yearPosition === -1) {
    yearPosition = fromFormat.indexOf('YY');
  }

  let newYear = newElement[yearPosition];
  const newMonth = newElement[monthPosition];
  const newDay = newElement[dayPosition];
  const newDate = [];

  if (fromFormat[yearPosition] === 'YY') {
    if (newYear.slice(-2) < 30) {
      newYear = '20' + newYear;
    } else {
      newYear = '19' + newYear;
    }
  }

  for (const ch of toFormat) {
    switch (ch) {
      case 'YYYY':
        newDate.push(newYear);
        break;
      case 'YY':
        newDate.push(newYear.slice(-2));
        break;
      case 'MM':
        newDate.push(newMonth);
        break;
      case 'DD':
        newDate.push(newDay);
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
