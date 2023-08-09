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
  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();
  const oldDateArr = date.split(fromSeparator);
  const structuredDate = {};
  const newDateFormatArr = [];
  const YEAR_KEY_LONG = 'YYYY';
  const YEAR_KEY_SHORT = 'YY';

  fromFormat.forEach((dateType, index) => {
    if (dateType === YEAR_KEY_SHORT) {
      structuredDate.YYYY = +oldDateArr[index] >= 30
        ? `19${oldDateArr[index]}`
        : `20${oldDateArr[index]}`;
    }

    structuredDate[dateType] = oldDateArr[index];
  });

  structuredDate[YEAR_KEY_SHORT] = structuredDate[YEAR_KEY_LONG].slice(2);

  toFormat.forEach((dateType) => {
    newDateFormatArr.push(structuredDate[dateType]);
  });

  return newDateFormatArr.join(toSeparator);
}

module.exports = formatDate;
