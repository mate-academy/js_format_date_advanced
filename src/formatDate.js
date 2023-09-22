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
  const SEPARATOR_INDEX = 3;
  const START_ITERATION = 0;
  const END_ITERATION = 3;
  const stringItems = date.split(fromFormat[SEPARATOR_INDEX]);
  const newDate = [];

  for (let i = START_ITERATION; i < END_ITERATION; i++) {
    let toFormatItem = toFormat[i];

    if (!fromFormat.includes(toFormatItem)) {
      const SHORT_YEAR = 'YY';
      const LONG_YEAR = 'YYYY';

      if (toFormatItem === LONG_YEAR) {
        toFormatItem = SHORT_YEAR;

        const currentYear = stringItems[fromFormat.indexOf(SHORT_YEAR)];
        const LAST_DIGITS = 30;
        const CURRENT_CENTURY_YEAR = '20';
        const PREVIOUS_CENTURY_YEAR = '19';

        stringItems[fromFormat.indexOf(SHORT_YEAR)] = currentYear < LAST_DIGITS
          ? CURRENT_CENTURY_YEAR + currentYear
          : PREVIOUS_CENTURY_YEAR + currentYear;
      } else if (toFormatItem === SHORT_YEAR) {
        toFormatItem = LONG_YEAR;

        const currentYear = stringItems[fromFormat.indexOf(LONG_YEAR)];

        stringItems[fromFormat.indexOf(LONG_YEAR)] = currentYear.slice(2);
      }
    }

    const fromFormatIndex = fromFormat.indexOf(toFormatItem);
    const item = stringItems[fromFormatIndex];

    newDate.push(item);
  }

  return newDate.join(toFormat[SEPARATOR_INDEX]);
}

module.exports = formatDate;
