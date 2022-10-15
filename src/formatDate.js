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
  const oldDate = date.split(fromFormat[3]);
  const newDate = [];
  const indexOfOldDay = fromFormat.indexOf('DD');
  const indexOfNewDay = toFormat.indexOf('DD');
  const indexOfOldMonth = fromFormat.indexOf('MM');
  const indexOfNewMonth = toFormat.indexOf('MM');
  const indexOfOldYearShort = fromFormat.indexOf('YY');
  const indexOfNewYearShort = toFormat.indexOf('YY');
  const indexOfOldYearLong = fromFormat.indexOf('YYYY');
  const indexOfNewYearLong = toFormat.indexOf('YYYY');

  const createDateInNewFormat = () => {
    newDate[indexOfNewDay] = oldDate[indexOfOldDay];
    newDate[indexOfNewMonth] = oldDate[indexOfOldMonth];

    // Checking the year format:

    // if oldFormat YYYY and newFormat YY
    if (indexOfOldYearLong >= 0 && indexOfNewYearShort >= 0) {
      const yearLastTwoCharacters = oldDate[indexOfOldYearLong].slice(2);

      newDate[indexOfNewYearShort] = yearLastTwoCharacters;
      // if oldFormat YY and newFormat YYYY
    } else if (indexOfOldYearShort >= 0 && indexOfNewYearLong >= 0) {
      let convertYear = '';

      if (+oldDate[indexOfOldYearShort] < 30) {
        convertYear = '20' + oldDate[indexOfOldYearShort];
      } else {
        convertYear = '19' + oldDate[indexOfOldYearShort];
      }

      newDate[indexOfNewYearLong] = convertYear;
      // if oldFormat YY and newFormat YY
    } else if (indexOfOldYearShort >= 0 && indexOfNewYearShort >= 0) {
      newDate[indexOfNewYearShort] = oldDate[indexOfOldYearShort];
      // if oldFormat YYYY and newFormat YYYY
    } else {
      newDate[indexOfNewYearLong] = oldDate[indexOfOldYearLong];
    }

    return newDate.join(toFormat[3]);
  };

  return createDateInNewFormat();
}

module.exports = formatDate;
