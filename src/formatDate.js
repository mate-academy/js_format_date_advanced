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
  const currentSeparator = fromFormat.slice(-1);
  const parsedDate = date.split(currentSeparator);

  const newSeparator = toFormat.slice(-1);
  const toFormatOrder = toFormat.slice(0, 3);
  const formattedDate = [];

  const YEAR_BREAKPOINT = 30;
  const THIS_CENTURY = 20;
  const LAST_CENTURY = 19;
  const SHORT_DATE = 2;
  const LONG_DATE = 4;

  for (let datePart of toFormatOrder) {
    const datePartLength = datePart.length;
    let needToConvert = false;

    if (!fromFormat.includes(datePart)) {
      needToConvert = true;

      if (datePartLength === SHORT_DATE) {
        datePart = 'YYYY';
      }

      if (datePartLength === LONG_DATE) {
        datePart = 'YY';
      }
    }

    const index = fromFormat.indexOf(datePart);

    if (needToConvert) {
      if (datePartLength === LONG_DATE) {
        parsedDate[index] = parsedDate[index] < YEAR_BREAKPOINT
          ? THIS_CENTURY + parsedDate[index]
          : LAST_CENTURY + parsedDate[index];
      }

      if (datePartLength === SHORT_DATE) {
        parsedDate[index] = parsedDate[index].split('').slice(2).join('');
      }
    }

    formattedDate.push(parsedDate[index]);
  }

  return formattedDate.join(newSeparator);
}

module.exports = formatDate;
