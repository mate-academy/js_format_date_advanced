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
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const arrayFromDate = date.split(separatorFrom);
  let changedDate = '';

  for (let i = 0; i < toFormat.length; i++) {
    for (const fromItem of fromFormat) {
      const indexFromItem = fromFormat.indexOf(fromItem);
      const arrayFromDateItem = arrayFromDate[indexFromItem];

      if (toFormat[i] === fromItem) {
        changedDate += i > 0
          ? separatorTo + arrayFromDateItem
          : arrayFromDateItem;
      }

      const isIncludedTo = toFormat[i].includes('Y');
      const isIncludedFrom = fromItem.includes('Y');
      const isLengthNotEqual = toFormat[i].length !== fromItem.length;

      if (isIncludedTo && isIncludedFrom && isLengthNotEqual) {
        const normalizedYearItem = getNormalizeYear(
          arrayFromDateItem,
          toFormat[i]
        );

        changedDate += i > 0
          ? separatorTo + normalizedYearItem
          : normalizedYearItem;
      }
    }
  }

  return changedDate;
}

function getNormalizeYear(yearFrom, toFormat) {
  if (toFormat.length > yearFrom.toString().length) {
    return yearFrom >= 30 ? `19${yearFrom}` : `20${yearFrom}`;
  }

  return yearFrom.split('').slice(2).join('');
}

module.exports = formatDate;
