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
  const separatorFrom = fromFormat[fromFormat.length - 1];
  let yearFromIndex;
  let monthFromIndex;
  let dayFromIndex;

  const separatorTo = toFormat[toFormat.length - 1];
  let yearTo;

  const dateArray = date.split(separatorFrom);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i].includes('Y')) {
      yearFromIndex = i;
    }

    if (fromFormat[i].includes('M')) {
      monthFromIndex = i;
    }

    if (fromFormat[i].includes('D')) {
      dayFromIndex = i;
    }

    if (toFormat[i].includes('Y')) {
      yearTo = toFormat[i];
    }
  }

  let year = dateArray[yearFromIndex];
  const milenium = (year < 30) ? 20 : 19;

  if (yearTo.length === 2 && year.length === 4) {
    year = year.slice(2);
  }

  if (yearTo.length === 4 && year.length === 2) {
    year = milenium + year;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('D')) {
      toFormat[i] = dateArray[dayFromIndex];
    }

    if (toFormat[i].includes('M')) {
      toFormat[i] = dateArray[monthFromIndex];
    }

    if (toFormat[i].includes('Y')) {
      toFormat[i] = year;
    }
  }

  toFormat.length -= 1;

  return toFormat.join(separatorTo);
}

module.exports = formatDate;
