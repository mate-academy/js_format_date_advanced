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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const newDate = [];
  const dateArray = date.split(oldSeparator);

  for (let i = 0; i < 3; i++) {
    let oldFormatPart = fromFormat[i];
    let dateArrayPart = dateArray[i];

    // checking years format for differences
    if (fromFormat[i][0] !== toFormat[i][0]) {

    }

    if (fromFormat[i].length > toFormat[i].length
      && fromFormat[i].slice(2) === toFormat[i]) {
      oldFormatPart = fromFormat[i].slice(2);
      dateArrayPart = dateArray[i].slice(2);
    } else if (fromFormat[i].length < toFormat[i].length
      && toFormat[i].slice(2) === fromFormat[i]) {
      oldFormatPart = 'YY' + fromFormat[i];

      dateArrayPart = dateArray[i] < 30
        ? '20' + dateArray[i]
        : '19' + dateArray[i];
    }

    // looking for place of a part of the date
    const index = toFormat.indexOf(oldFormatPart);

    // assigning part of the date to proper place in array
    newDate[index] = dateArrayPart;
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
