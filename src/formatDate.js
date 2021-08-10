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
  const separateFromFormat = fromFormat[3];
  const separateToFormat = toFormat[3];
  const dateSplit = date.split(separateFromFormat);
  let oldIndexYY;
  let oldIndexDD;
  let oldIndexMM;
  let newIndexYY;
  let newIndexDD;
  let newIndexMM;
  let expectedYYLength = 0;
  const newTime = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      oldIndexDD = i;
    }

    if (fromFormat[i] === 'MM') {
      oldIndexMM = i;
    }

    if (fromFormat[i].includes('Y')) {
      oldIndexYY = i;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newIndexDD = i;
    }

    if (toFormat[i] === 'MM') {
      newIndexMM = i;
    }

    if (toFormat[i].includes('Y')) {
      newIndexYY = i;
      expectedYYLength = toFormat[i].length;
    }
  }

  newTime[newIndexDD] = dateSplit[oldIndexDD];
  newTime[newIndexMM] = dateSplit[oldIndexMM];
  newTime[newIndexYY] = dateSplit[oldIndexYY];

  if (expectedYYLength === 2) {
    newTime[newIndexYY] = newTime[newIndexYY] % 100;

    return newTime.join(separateToFormat);
  }

  if (newTime[newIndexYY] >= 30 && newTime[newIndexYY].length === 2) {
    newTime[newIndexYY] = '19' + newTime[newIndexYY];
  }

  if (newTime[newIndexYY] < 30 && newTime[newIndexYY].length === 2) {
    newTime[newIndexYY] = '20' + newTime[newIndexYY];
  }

  return newTime.join(separateToFormat);
}

module.exports = formatDate;
