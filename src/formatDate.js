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
  fromFormat.reverse();

  const [separator, ...format] = fromFormat;
  const initialDate = date
    .split(separator)
    .reverse()
    .map((pieceOfDate, index) => {
      return [format[index], pieceOfDate];
    });

  const initialDateObject = Object.fromEntries(initialDate);
  const formatDateObject = {};

  for (const symbol of toFormat) {
    switch (symbol) {
      case 'DD':
        formatDateObject[symbol] = initialDateObject[symbol];
        break;
      case 'MM':
        formatDateObject[symbol] = initialDateObject[symbol];
        break;
      case 'YY':
        formatDateObject[symbol] = initialDateObject.hasOwnProperty(symbol)
          ? initialDateObject[symbol]
          : initialDateObject.YYYY.slice(2);
        break;
      case 'YYYY':
        formatDateObject[symbol] = initialDateObject.hasOwnProperty(symbol)
          ? initialDateObject[symbol]
          : formatDateObject[symbol] = initialDateObject.YY >= 30
            ? `19${initialDateObject.YY}`
            : `20${initialDateObject.YY}`;
        break;
    }
  }

  const formatSeparator = toFormat[toFormat.length - 1];

  return Object.values(formatDateObject).join(formatSeparator);
}

module.exports = formatDate;
