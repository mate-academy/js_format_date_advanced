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
  const fromSeparate = fromFormat[fromFormat.length - 1];
  const toSeparate = toFormat[toFormat.length - 1];
  const oldDate = date.split(fromSeparate);
  const dateInfo = {};
  const formatedDate = [];

  const yearFull = 'YYYY';
  const yearShort = 'YY';

  let yearOfDate;

  for (let i = 0; i < oldDate.length; i++) {
    dateInfo[fromFormat[i]] = oldDate[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (dateInfo.hasOwnProperty(toFormat[i])) {
      formatedDate.push(dateInfo[toFormat[i]]);
    }

    if (toFormat[i] === yearShort) {
      yearOfDate = dateInfo[yearFull].toString().slice(2);
      formatedDate.push(yearOfDate);
    }

    if (toFormat[i] === yearFull && !dateInfo.hasOwnProperty(toFormat[i])) {
      yearOfDate = dateInfo[yearShort] >= 30
        ? `19${dateInfo[yearShort]}`
        : `20${dateInfo[yearShort]}`;

      formatedDate.push(yearOfDate);
    }
  }

  return formatedDate.join(toSeparate);
}

module.exports = formatDate;
