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
  let divider = fromFormat[fromFormat.length - 1];
  const splitedDate = date.split(divider);

  const dateType = {};
  const sortedDate = [];

  for (let i = 0; i < splitedDate.length; i++) {
    dateType[fromFormat[i]] = splitedDate[i];
  }

  for (let i = 0; i < splitedDate.length; i++) {
    const newFormat = toFormat[i];

    if (dateType.hasOwnProperty(newFormat)) {
      sortedDate.push(dateType[newFormat]);
      continue;
    }

    if (newFormat === 'YY') {
      const prevFormat = 'YYYY';

      sortedDate.push(dateType[prevFormat].slice(2));
    }

    if (newFormat === 'YYYY') {
      const prevFormat = 'YY';

      if (dateType[prevFormat] < 30) {
        sortedDate.push(`20${dateType[prevFormat]}`);
        continue;
      }

      sortedDate.push(`19${dateType[prevFormat]}`);
    }
  }

  divider = toFormat[toFormat.length - 1];

  return sortedDate.join(divider);
}

module.exports = formatDate;
