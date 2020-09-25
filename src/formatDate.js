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
  const typeFormat = toFormat.slice(0, 3);
  const symbolFromFormat = fromFormat[3];
  const symbolTOFormat = toFormat[3];
  const newDate = date.split(symbolFromFormat);
  const objDate = {
    [fromFormat[0]]: newDate[0],
    [fromFormat[1]]: newDate[1],
    [fromFormat[2]]: newDate[2],
  };

  const newFormatDate = [];

  for (const typeDate of typeFormat) {
    if (objDate.hasOwnProperty(typeDate)) {
      newFormatDate.push(objDate[typeDate]);
      continue;
    }

    if (typeDate === 'YY') {
      newFormatDate.push(objDate.YYYY.slice(-2));
    } else {
      newFormatDate.push(
        objDate.YY < 30 ? `20${objDate.YY}` : `19${objDate.YY}`
      );
    }
  }

  return newFormatDate.join(symbolTOFormat);
}

module.exports = formatDate;
