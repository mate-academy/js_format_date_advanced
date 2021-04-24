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
  function changeYearFormat(yearFormat, currentDate, index) {
    if (yearFormat[index].length === 4) {
      currentDate[index] = currentDate[index].substr(2);

      return currentDate;
    }

    if (currentDate[index] < 30) {
      currentDate[index] = '20' + currentDate[index];
    } else {
      currentDate[index] = '19' + currentDate[index];
    }

    return currentDate;
  }

  const separator = toFormat[3];
  const dateSplited = date.split(fromFormat[3]);

  if (fromFormat[0] === toFormat[0] && fromFormat[2] === toFormat[2]) {
    return dateSplited.join(separator);
  }

  if (fromFormat[0] === toFormat[2] && fromFormat[2] === toFormat[0]) {
    return dateSplited.reverse().join(separator);
  }

  if (fromFormat[0] === toFormat[0] && fromFormat[2] !== toFormat[2]) {
    const newDateFormat = changeYearFormat(fromFormat, dateSplited, 2);

    return newDateFormat.join(separator);
  }

  if (fromFormat[0] !== toFormat[0] && fromFormat[2] === toFormat[2]) {
    const newDateFormat = changeYearFormat(fromFormat, dateSplited, 0);

    return newDateFormat.join(separator);
  }

  if (fromFormat[0] !== toFormat[2] && fromFormat[2] === toFormat[0]) {
    const newDateFormat = changeYearFormat(fromFormat, dateSplited, 0);

    return newDateFormat.reverse().join(separator);
  }
}

module.exports = formatDate;
