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
  const oldFormatSplitter = fromFormat[fromFormat.length - 1];
  const newFormatSplitter = toFormat[toFormat.length - 1];
  const oldFormatSplittedDate = date.split(oldFormatSplitter);
  const oldFormatObject = {};
  const newFormatObject = {};

  for (let i = 0; i < oldFormatSplittedDate.length; i++) {
    oldFormatObject[fromFormat[i]] = oldFormatSplittedDate[i];
    newFormatObject[toFormat[i]] = 0;
  }

  for (const key in oldFormatObject) {
    const newObjectHasAKey = newFormatObject.hasOwnProperty(key);

    if (newObjectHasAKey) {
      newFormatObject[key] = oldFormatObject[key];
    }

    if (key === 'YY' && !newObjectHasAKey) {
      if (oldFormatObject[key] < 30) {
        newFormatObject['YYYY'] = +('20' + oldFormatObject[key]);
      } else {
        newFormatObject['YYYY'] = +('19' + oldFormatObject[key]);
      }
    }

    if (key === 'YYYY' && !newObjectHasAKey) {
      newFormatObject['YY'] = +oldFormatObject[key].substr(2);
    }
  }

  const newFormatObjectValues = Object.values(newFormatObject);

  return newFormatObjectValues.join(newFormatSplitter);
}

module.exports = formatDate;
