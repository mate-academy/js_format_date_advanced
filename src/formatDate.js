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
  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];
  const arrayDate = date.split(separatorOld);
  const newArrayData = [];
  const oldFormat = fromFormat.slice(0, -1);
  const newFormat = toFormat.slice(0, -1);
  const oldFormatSingle = [];
  const newFormatSingle = [];
  let indexYInOld = 0;
  let indexYInNew = 0;

  for (let i = 0; i < 3; i++) {
    oldFormatSingle[i] = oldFormat[i].substr(0, 1);
    newFormatSingle[i] = newFormat[i].substr(0, 1);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (oldFormatSingle[i] === newFormatSingle[j]) {
        newArrayData[j] = arrayDate[i];
      }

      if (oldFormatSingle[i] === 'Y') {
        indexYInOld = i;
      }

      if (newFormatSingle[i] === 'Y') {
        indexYInNew = i;
      }
    }
  }

  if (oldFormat[indexYInOld].length < newFormat[indexYInNew].length) {
    if (newArrayData[indexYInNew] < 30) {
      newArrayData[indexYInNew] = 20 + newArrayData[indexYInNew];
    } else {
      newArrayData[indexYInNew] = 19 + newArrayData[indexYInNew];
    }
  } else if (oldFormat[indexYInOld].length > newFormat[indexYInNew].length) {
    newArrayData[indexYInNew] = newArrayData[indexYInNew].slice(2);
  }

  return newArrayData.join(separatorNew);
}

module.exports = formatDate;
