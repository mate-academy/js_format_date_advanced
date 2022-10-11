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
  const inSeparator = fromFormat[3];
  const outSeparator = toFormat[3];
  const newDate = [];

  const slicedDate = date.split(inSeparator);

  slicedDate.length = 3;

  let indexY;
  let indexM;
  let indexD;

  for (let i = 0; i < slicedDate.length; i++) {
    if (fromFormat[i].includes('Y')) {
      indexY = i;
    } else if (fromFormat[i].includes('M')) {
      indexM = i;
    } else if (fromFormat[i].includes('D')) {
      indexD = i;
    };
  };

  for (let i = 0; i < slicedDate.length; i++) {
    if (toFormat[i].includes('Y')) {
      const yearFormat = toFormat[i];
      const neededYearFormat = slicedDate[indexY];

      if (neededYearFormat.length > yearFormat.length) {
        newDate[i] = neededYearFormat.slice(2);
      } else if (neededYearFormat.length < yearFormat.length) {
        if (Number(neededYearFormat) < 30) {
          newDate[i] = '20' + neededYearFormat;
        } else {
          newDate[i] = '19' + neededYearFormat;
        };
      } else if (neededYearFormat.length === yearFormat.length) {
        newDate[i] = neededYearFormat;
      };
    } else if (toFormat[i].includes('M')) {
      newDate[i] = slicedDate[indexM];
    } else if (toFormat[i].includes('D')) {
      newDate[i] = slicedDate[indexD];
    };
  }
  newDate.length = 3;

  const result = newDate.join(outSeparator);

  return result;
}

module.exports = formatDate;
