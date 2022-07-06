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
  const newDate = date.split(fromFormat[3]);
  const fromFindY = fromFormat.find(el => el.includes('Y'));
  const toFindY = toFormat.find(el => el.includes('Y'));
  const fromFindIndex = fromFormat.indexOf(fromFindY);
  const toFindIndex = toFormat.indexOf(toFindY);
  const fromFindM = fromFormat.find(el => el.includes('M'));
  const fromFindIndexM = fromFormat.indexOf(fromFindM);

  if (fromFindY.length - toFindY.length === 2) {
    const yearSplit = newDate[fromFindIndex].split('');

    newDate[fromFindIndex] = `${yearSplit[2]}${yearSplit[3]}`;
  }

  if (toFindY.length - fromFindY.length === 2) {
    if (+newDate[fromFindIndex] < 30) {
      newDate[fromFindIndex] = `20${newDate[fromFindIndex]}`;
    } else {
      newDate[fromFindIndex] = `19${newDate[fromFindIndex]}`;
    }
  }

  if (fromFindIndex !== toFindIndex) {
    if (fromFindIndex === 1) {
      [newDate[fromFindIndex], newDate[fromFindIndexM]]
       = [newDate[fromFindIndexM], newDate[fromFindIndex]];
    }

    newDate.reverse();
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
