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
  const separator = fromFormat[3];
  const upgradeSeparator = toFormat[3];
  const dateArray = date.split(separator);
  let yearYYYY;
  let yearYY;
  let month;
  let day;
  const upgradeDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      yearYYYY = dateArray[i];
    }

    if (fromFormat[i] === 'YY') {
      yearYY = dateArray[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArray[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateArray[i];
    }
  }

  if (yearYYYY === undefined) {
    if (yearYY < 30) {
      yearYYYY = `20${yearYY}`;
    }

    if (yearYY >= 30) {
      yearYYYY = `19${yearYY}`;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY') {
      upgradeDate.push(yearYYYY);
    }

    if (toFormat[i] === 'YY' && yearYY !== undefined) {
      upgradeDate.push(yearYY);
    }

    if (toFormat[i] === 'YY' && yearYY === undefined) {
      upgradeDate.push(`${yearYYYY[2]}${yearYYYY[3]}`);
    }

    if (toFormat[i] === 'MM') {
      upgradeDate.push(month);
    }

    if (toFormat[i] === 'DD') {
      upgradeDate.push(day);
    }
  }

  return upgradeDate.join(upgradeSeparator);
}

module.exports = formatDate;
