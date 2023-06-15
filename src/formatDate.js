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
  const SHORT_YEAR_FORMAT = 'YY';
  const LONG_YEAR_FORMAT = 'YYYY';

  const fromSeparator = fromFormat.pop();
  const toSeparator = toFormat.pop();

  const dateValues = date.split(fromSeparator);
  const collectedDateValues = {};
  const newDateFormat = [];

  for (let i = 0; i < dateValues.length; i++) {
    const currentDateKey = fromFormat[i];
    const currentDateValue = dateValues[i];

    if (currentDateKey === SHORT_YEAR_FORMAT) {
      collectedDateValues[LONG_YEAR_FORMAT] = currentDateValue >= 30
        ? `19${currentDateValue}`
        : `20${currentDateValue}`;
    }

    if (currentDateKey === LONG_YEAR_FORMAT) {
      collectedDateValues[SHORT_YEAR_FORMAT] = currentDateValue.slice(2);
    }

    collectedDateValues[currentDateKey] = currentDateValue;
  }

  for (const part of toFormat) {
    newDateFormat.push(collectedDateValues[part]);
  }

  return newDateFormat.join(toSeparator);
}

module.exports = formatDate;
