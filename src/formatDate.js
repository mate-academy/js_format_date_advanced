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
  // write code here
  const separatorInput = fromFormat[3];
  const separatorOutput = toFormat[3];

  const dateArray = date.split(separatorInput);

  let yearIndex;
  let monthIndex;
  let dayIndex;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      yearIndex = i;
    };

    if (fromFormat[i].includes('M')) {
      monthIndex = i;
    };

    if (fromFormat[i].includes('D')) {
      dayIndex = i;
    };
  };

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      const yearFormat = toFormat[i];
      const currentYearFormat = dateArray[yearIndex];

      if (currentYearFormat.length > yearFormat.length) {
        toFormat[i] = currentYearFormat.slice(2);
      };

      if (currentYearFormat.length < yearFormat.length) {
        if (Number(currentYearFormat) < 30) {
          toFormat[i] = '20' + currentYearFormat;
        } else {
          toFormat[i] = '19' + currentYearFormat;
        };
      }

      if (currentYearFormat.length === yearFormat.length) {
        toFormat[i] = currentYearFormat;
      };
    };

    if (toFormat[i].includes('M')) {
      toFormat[i] = dateArray[monthIndex];
    };

    if (toFormat[i].includes('D')) {
      toFormat[i] = dateArray[dayIndex];
    };
  }

  const newDate = toFormat.slice(0, 3).join(separatorOutput);

  return newDate;
}

module.exports = formatDate;

//  When converting from YYYY to YY just use 2 last digit (1997 -> 97).
//  *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
