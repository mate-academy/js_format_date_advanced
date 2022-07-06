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
  const fromFormatFindY = fromFormat.find(el => el.includes('Y'));
  const toFormatFindY = toFormat.find(el => el.includes('Y'));
  const fromFormatFindIndex = fromFormat.indexOf(fromFormatFindY);
  const toFormatFindIndex = toFormat.indexOf(toFormatFindY);
  const fromFormatFindM = fromFormat.find(el => el.includes('M'));
  const fromFormatFindIndexM = fromFormat.indexOf(fromFormatFindM);

  function newDateYear(item) {
    if (+item < 30) {
      return (newDate[fromFormatFindIndex] = `20${newDate[fromFormatFindIndex]}`);
    } else {
      newDate[fromFormatFindIndex] = `19${newDate[fromFormatFindIndex]}`;
    }
  }

  if (fromFormatFindY.length - toFormatFindY.length === 2) {
    const yearSplit = newDate[fromFormatFindIndex].split('');

    newDate[fromFormatFindIndex] = `${yearSplit[2]}${yearSplit[3]}`;
  }

  if (toFormatFindY.length - fromFormatFindY.length === 2) {
    newDateYear(newDate[fromFormatFindIndex]);
  }

  if (fromFormatFindIndex !== toFormatFindIndex) {
    if (fromFormatFindIndex === 1) {
      [newDate[fromFormatFindIndex], newDate[fromFormatFindIndexM]]
       = [newDate[fromFormatFindIndexM], newDate[fromFormatFindIndex]];
    }

    newDate.reverse();
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
